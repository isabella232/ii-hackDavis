const express = require('express')
const ObjectID = require('mongodb').ObjectID
const sharp = require('sharp')
const Admin = require('../models/admin')
const Interpreter = require('../models/interpreter')
const Event = require('../models/event')
const { adminAuth } = require('../middleware/auth')
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email')
const { saveInterpreter } = require('../utils/algolia')
const { getToValidate } = require('../utils/admin')
const { imgUpload } = require('../utils/multer')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo } = require('../utils/user')

const router = new express.Router()

// create admin account
router.post('/api/admin/create', imgUpload.single('avatar'), async (req, res) => {
    if (req.body.adminCode !== 'secretCode') {
        const error = new Error('Invalid Admin Code')
        res.status(400).send({ error: error.message })
        throw error
    }

    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const info = fillSignupInfo(req.body, buffer)
        const admin = new Admin(info)
        sendWelcomeEmail(admin.email, admin.name)
        const token = await admin.generateAuthToken()
        await admin.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// get admin home page
router.get('/api/admin/adminpage', adminAuth, async (req, res) => {
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

// validate a certificate
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

// reject a certificate
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

// verify a interpreter
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
