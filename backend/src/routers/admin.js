const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const ObjectID = require('mongodb').ObjectID;
const { sendVerifyEmail, sendRejectEmail } = require('../utils/email');

const router = new express.Router()

router.get('/admin/:id/homepage', async (req, res) => {
    try {
        const users = await User.find().elemMatch('certifications', { isValidated: false }).limit(10)
        const toValidate = users.map(interpreter => {
            const unvalidatedCertificates = []
            interpreter.certifications.forEach(certificate => {
                if (!certificate.isValidated) {
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
        const user = await User.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        // const index = user.certifications.findIndex(certificate => certificate._id.toString() === id)
        // user.certifications[index].isValidated = true
        // await user.save()
        sendVerifyEmail(user.email, user.name)
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/certificate/:id/reject', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne().elemMatch('certifications', { _id: new ObjectID(id) })
        const index = user.certifications.findIndex(certificate => certificate._id.toString() === id)
        user.certifications[index].isRejected = true
        await user.save()
        sendRejectEmail(user.email, user.name)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
