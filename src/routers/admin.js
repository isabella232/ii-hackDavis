const express = require('express')
const Interpreter = require('../models/interpreter')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const ObjectID = require('mongodb').ObjectID
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email')
const { saveInterpreter } = require('../utils/algolia')
const { getToValidate } = require('../utils/admin')

const router = new express.Router()

router.get('/api/admin/adminpage', async (req, res) => {
    try {
        const now = new Date()
        const pastEvents = await Event.find().where('date').lt(now).limit(2)
        const upcomingEvents = await Event.find().where('date').gte(now).limit(3)
        const interpreters = await Interpreter.find({
            $or: [
                { 'isVerified': false },
                { 'certifications': { '$elemMatch': { isValidated: false, isRejected: false } } }
            ]
        }).limit(10)
        const toValidate = getToValidate(interpreters)

        const data = {
            pastEvents: pastEvents,
            upcomingEvents: upcomingEvents,
            toValidate: toValidate
        }
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/admin/certificates/:id/validate', async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const index = interpreter.certifications.findIndex(certificate => certificate._id.toString() === id)

        interpreter.certifications[index].isValidated = true
        if (interpreter.isValidated === false) {
            interpreter.isValidated = true
        }
        await interpreter.save()

        saveInterpreter(interpreter)
        sendVerifyEmail(interpreter.email, interpreter.name)

        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/admin/certificates/:id/reject', async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const index = interpreter.certifications.findIndex(certificate => certificate._id.toString() === id)

        interpreter.certifications[index].isRejected = true
        await interpreter.save()

        sendRejectEmail(interpreter.email, interpreter.name)

        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/admin/interpreters/:id/verify', async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOneAndUpdate({ _id: new ObjectID(id) }, { isVerified: true })
        saveInterpreter(interpreter)
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
