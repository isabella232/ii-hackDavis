const express = require('express')
const sharp = require('sharp')
const ObjectID = require('mongodb').ObjectID
const Interpreter = require('../models/interpreter')
const auth = require('../middleware/auth')
const { imgUploader, getCertificateURL } = require('../utils/image')
const { accumulateRatings, processReviews } = require('../utils/interpreter')
const { getAvatarURL } = require('../utils/image')
const { sendWelcomeEmail } = require('../utils/email')

const router = new express.Router()

router.post('/api/interpreter/create', imgUploader.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        let services = [], list = JSON.parse(req.body.services)
        for (const service of list) {
            services.push(service)
        }
        const interpreter = new Interpreter({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: {
                buffer: buffer,
                url: getAvatarURL(req.params.id)
            },
            services: services,
            summary: req.body.summary,
            languages: JSON.parse(req.body.languages)
        })
        sendWelcomeEmail(interpreter.email, interpreter.name)
        await interpreter.generateCoordinates(req.body.location)
        await interpreter.save()
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

// interpreters can update their own profiles
router.patch('/api/interpreter/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['location', 'languagues', 'englishFluency', 'certification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // from being logged in
        const profile = await Interpreter.findOne({ owner: req.interpreter._id })

        updates.forEach((update) => profile[update] = req.body[update])
        await profile.save() // where middleware gets executed

        if (!profile) {
            return res.status(404).send()
        }
        res.status(201).send(profile)
    } catch (e) {
        res.status(400).send(e)
    }
})

// TODO: delete only one certificate
router.delete('/api/interpreter/me/certificates', auth, async (req, res) => {
    try {
        // deletes all for now
        req.interpreter.certificates = []
        await req.interpreter.save()
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

// fetch all details for interpreter
router.get('/api/interpreters/:id/details', auth, async (req, res) => {
    try {
        const interpreter = await Interpreter.findById(req.params.id)
        const reviews = processReviews([...interpreter.reviews])
        const certifications = []
        interpreter.certifications.forEach(certificate => {
            if (!certificate.isRejected) {
                const cert = {
                    title: certificate.title,
                    image: certificate.file.url,
                    isValidated: certificate.isValidated
                }
                certifications.push(cert)
            }
        })
        const details = {
            rating: interpreter.rating ? interpreter.rating : null,
            certifications: certifications,
            reviews: reviews
        }
        res.send(details)
    } catch (e) {
        res.status(404).send()
    }
})

// add review by interpreter to db
router.post('/api/interpreters/:id/reviews/add', auth, async (req, res) => {
    try {
        const interpreter = await Interpreter.findById(req.params.id)
        if (!interpreter.rating) {
            interpreter.rating = req.body.rating
        } else {
            interpreter.rating = accumulateRatings(req.body.rating, interpreter.rating, interpreter.reviews.length)
        }
        const review = {
            rating: req.body.rating,
            reviewerName: req.body.name,
            comment: req.body.comment,
        }
        interpreter.reviews.push(review)
        interpreter.save()
        res.send()
    } catch (e) {
        res.status(404).send()
    }
})

// upload a certificate separately
router.post('/api/interpreters/:id/certificate/upload', auth, imgUploader.single('certificate'), async (req, res) => {
    const id = req.params.id
    const interpreter = await Interpreter.findById(id)
    const certificateID = ObjectID()
    const certificate = {
        _id: certificateID,
        title: req.body.title,
        file: {
            buffer: req.file.buffer,
            url: getCertificateURL(certificateID)
        }
    }

    interpreter.certifications.push(certificate)
    await interpreter.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// fetch a certificate image
router.get('/api/interpreter/certificates/:id', async (req, res) => {
    try {
        const id = req.params.id
        const interpreter = await Interpreter.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const certificate = interpreter.certifications.find(certificate => certificate._id.toString() === id)

        if (!interpreter || !certificate) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(certificate.file.buffer)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
