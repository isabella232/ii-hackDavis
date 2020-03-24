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
            date: new Date(req.body.date),
            location: req.body.location,
            summary: req.body.summary,
            image: {
                buffer: req.file.buffer,
                url: getEventImageURL(id)
            }
        }
        const event = await new Event(parsedEvent)
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
        await event.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
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

module.exports = router
