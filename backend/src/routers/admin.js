const express = require('express')
const Interpreter = require('../models/interpreterProfile')
const auth = require('../middleware/auth')
const ObjectID = require('mongodb').ObjectID
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email')
const { saveiProfile } = require('../utils/algolia')

const router = new express.Router()

router.get('/admin', async (req, res) => {
    try {
        const interpreters = await Interpreter.find().elemMatch('certifications', { isValidated: false, isRejected: false }).limit(10)
        const toValidate = interpreters.map(interpreter => {
            const unvalidatedCertificates = []
            interpreter.certifications.forEach(certificate => {
                if (!certificate.isValidated && !certificate.isRejected) {
                    unvalidatedCertificates.push(certificate)
                }
            })

            return {
                name: interpreter.name,
                avatar: interpreter.avatar,
                location: interpreter.location.locationString,
                unvalidatedCertificates: unvalidatedCertificates
            }
        })
        res.status(200).send(toValidate)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/certificate/:id/verify', async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const index = interpreter.certifications.findIndex(certificate => certificate._id.toString() === id)
        interpreter.certifications[index].isValidated = true
        await interpreter.save()
        saveiProfile(interpreter)
        sendVerifyEmail(interpreter.email, interpreter.name)
        res.status(200).send(interpreter)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/certificate/:id/reject', async (req, res) => {
    const id = req.params.id
    try {
        const interpreter = await Interpreter.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const index = interpreter.certifications.findIndex(certificate => certificate._id.toString() === id)
        interpreter.certifications[index].isRejected = true
        await interpreter.save()
        sendRejectEmail(interpreter.email, interpreter.name)
        res.status(200).send(interpreter)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
