const express = require('express')
const Interpreter = require('../models/interpreter')
const auth = require('../middleware/auth')
const { certUpload } = require('../utils/multer')
const { accumulateRatings, processReviews } = require('../utils/interpreter')

const router = new express.Router()

// UPDATE THESE ROUTES

// creating a profile
// idk on what screen this will live
router.post('/api/interpreters', async (req, res) => {
    var interpreter = new Interpreter(req.body)
    try {
        await interpreter.generateCoordinates(req.body.location.locationString)
        await interpreter.save()
        const token = await interpreter.generateAuthToken()
        res.status(201).send(interpreter)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// interpreters can update their own profiles
router.patch('/api/interpreters/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['location', 'languagues', 'englishFluency', 'certification']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // from being logged in
        const profile = await Interpreter.findOne({ owner: req.user._id })

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

// Adds a Certification to the user
router.post('/api/interpreters/me/certificates', auth, certUpload.single('certificate'), async (req, res) => {
    //creates new certificate from req
    const newCertificate = {
        certification: req.body.certificateName,
        file: req.file.buffer
    }
    req.user.certifications = req.user.certifications.concat(newCertificate)

    await req.user.save()
    res.status(200).send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// TODO: delete only one certificate
router.delete('/api/interpreters/me/certificates', auth, async (req, res) => {
    try {
        // deletes all for now
        req.user.certificates = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

// TODO: fix the context type thing
router.get('/api/interpreters/:id/certificates', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || user.certificates.length === 0) {
            throw new Error()
        }

        // res.set('Content-Type', 'application/pdf')
        res.send(user.certificates)
    } catch (e) {
        res.status(404).send()
    }
})

// fetch all details for interpreter
router.get('/api/interpreters/:id/details', async (req, res) => {
    try {
        const interpreter = await Interpreter.findById(req.params.id)
        const reviews = processReviews([...interpreter.reviews])
        const certifications = []
        interpreter.certifications.forEach(certificate => {
            if (!certificate.isRejected) {
                const cert = {
                    title: certificate.title,
                    image: certificate.file,
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

// add review by user to db
router.post('/api/interpreters/:id/review', async (req, res) => {
    try {
        const interpreter = await Interpreter.findById(req.params.id)
        if (!interpreter.rating) {
            interpreter.rating = req.body.rating
        } else {
            interpreter.rating = accumulateRatings(req.body.rating, interpreter.rating, interpreter.reviews.length)
        }
        const review = {
            rating: req.body.rating,
            userName: req.body.name,
            comment: req.body.comment,
        }
        interpreter.reviews.push(review)
        interpreter.save()
        res.send()
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
