const express = require('express')
const Interpreter = require('../models/interpreter')
const auth = require('../middleware/auth')
const ObjectID = require('mongodb').ObjectID
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email')
const { saveInterpreter } = require('../utils/algolia')

const router = new express.Router()

router.get('/api/admin', async (req, res) => {
    try {
        const interpreters = await Interpreter.find({
            $or: [
                { 'isVerified': false },
                { 'certifications': { '$elemMatch': { isValidated: false, isRejected: false } } }
            ]
        }).limit(10)
        const toValidate = interpreters.map(interpreter => {
            const unvalidatedCertificates = []

            interpreter.certifications.forEach(certificate => {
                if (!certificate.isValidated && !certificate.isRejected) {
                    unvalidatedCertificates.push({
                        id: certificate.id,
                        title: certificate.title,
                        image: certificate.file.url
                    })
                }
            })

            return {
                name: interpreter.name,
                avatar: interpreter.avatar.url,
                location: interpreter.location.locationString,
                unvalidatedCertificates: unvalidatedCertificates
            }
        })
        res.send(toValidate)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/certificates/:id/validate', async (req, res) => {
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

router.patch('/api/certificates/:id/reject', async (req, res) => {
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

router.patch('/api/interpreters/:id/verify', async (req, res) => {
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
