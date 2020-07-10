const express = require('express')
const Event = require('../models/event')
const ObjectID = require('mongodb').ObjectID
const auth = require('../middleware/auth')
const { imgUploader, getEventImageURL } = require('../utils/image')

const router = new express.Router()

router.post('/api/event/create', auth, imgUploader.single('image'), async (req, res) => {
    try {
        const id = ObjectID()
        const parsedEvent = {
            _id: id,
            title: req.body.title,
            author: req.user.name,
            date: new Date(req.body.date),
            location: req.body.location,
            summary: req.body.summary,
            image: {
                buffer: req.file.buffer,
                url: getEventImageURL(id)
            }
        }
        const event = await new Event(parsedEvent)
        event.setTarget(req.body.target)
        await event.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.patch('/api/events/:id/edit', auth, imgUploader.single('image'), async (req, res) => {
    try {
        const id = req.params.id
        const event = await Event.findById(id)
        event.title = req.body.title
        event.author = req.user.name
        event.date = new Date(req.body.date)
        event.location = req.body.location
        event.summary = req.body.summary
        if (req.file) {
            const image = {
                buffer: req.file.buffer,
                url: getEventImageURL(id)
            }
            event.image = image
        }
        event.setTarget(req.body.target)
        await event.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.get('/api/events/fetch', auth, async (req, res) => {
    try {
        const now = new Date()
        const pastEvents = await Event.find({ 'isArchived': false }).where('date').lt(now)
        const upcomingEvents = await Event.find({ 'isArchived': false }).where('date').gte(now)
        res.send({
            pastEvents: pastEvents,
            upcomingEvents: upcomingEvents
        })
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/api/events/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const event = await Event.findById(req.params.id)

        if (!event) {
            throw new Error('No event found.')
        }

        res.set('Content-Type', 'image/png')
        res.send(event.image.buffer)
    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/api/events/:id/delete', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        await event.delete()
        res.send()
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/api/events/:id/archive', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.isArchived = true
        await event.save()
        res.send()
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/api/events/:id/unarchive', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.isArchived = false
        await event.save()
        res.send()
    } catch (e) {
        res.status(404).send()
    }
})

// can't use GET for this route for some reason
router.post('/api/events/fetchArchive', async (req, res) => {
    try {
        const events = await Event.find({ 'isArchived': true }).sort({ date: -1 })
        res.send({ archivedEvents: events })
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
