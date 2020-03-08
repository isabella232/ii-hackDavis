const express = require('express')
const Event = require('../models/event')
const ObjectID = require('mongodb').ObjectID
const auth = require('../middleware/auth')
const { imgUpload } = require('../utils/multer')
const { getEventImageURL } = require('../utils/image')

const router = new express.Router()

router.post('/api/events/create', imgUpload.single('image'), async (req, res) => {
    try {
        const id = ObjectID()
        const parsedEvent = {
            _id: id,
            title: req.body.title,
            date: new Date(),
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

router.get('/api/events/:id', async (req, res) => {
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

router.get('/api/events/:id/details', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new Error()
        }
        await event.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/events/:id/edit', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'summary', 'image', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new Error()
        }
        updates.forEach((update) => event[update] = req.body[update])
        await event.save()
        res.send(req.event)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
