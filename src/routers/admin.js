const express = require('express')
const sharp = require('sharp')
const ObjectID = require('mongodb').ObjectID
const Admin = require('../models/admin')
const AdminCode = require('../models/adminCode')
const Interpreter = require('../models/interpreter')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email')
const { saveInterpreter } = require('../utils/algolia')
const { getToValidate, checkAdminCode } = require('../utils/admin')
const { imgUploader } = require('../utils/image')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo } = require('../utils/user')

const router = new express.Router()

// create admin account
router.post('/api/admin/create', imgUploader.single('avatar'), async (req, res) => {
    try {
        await checkAdminCode(req.body.adminCode)
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
router.get('/api/admin/adminpage', auth, async (req, res) => {
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
router.patch('/api/admin/certificates/:id/validate', auth, async (req, res) => {
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
router.patch('/api/admin/certificates/:id/reject', auth, async (req, res) => {
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
router.patch('/api/admin/interpreters/:id/verify', auth, async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOneAndUpdate({ _id: new ObjectID(id) }, { isVerified: true })
        saveInterpreter(interpreter)
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// create an admin code
router.post('/api/admin/code/create', auth, async (req, res) => {
    try {
        const admin = req.user
        await admin.isAdmin()
        const adminCode = new AdminCode({ code: req.body.adminCode })
        await adminCode.save()
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

// get admin code created
router.post('/api/admin/code/all', auth, async (req, res) => {
    try {
        const admin = req.user
        await admin.isAdmin()
        const adminCode = new AdminCode({ code: req.body.adminCode })
        await adminCode.save()
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

module.exports = router
