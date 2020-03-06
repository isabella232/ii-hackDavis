const express = require('express')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const ObjectID = require('mongodb').ObjectID

const router = new express.Router()

router.post('/api/events/create', async (req, res) => {
    try {
        const event = await new Event(req.body)
        event.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/api/events/:id/details', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new Error()
        }
        event.save()
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
