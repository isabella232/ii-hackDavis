const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// visit admin profile
router.get('/admin/:id/homepage', async (req, res) => {
    User.find().elemMatch('certifications', { isValidated: false }).limit(10)
        .then(result => {
            const toValidate = result.map(interpreter => {
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
        })
        .catch(error => {
            console.log(error)
            res.status(400).send()
        })
})

module.exports = router
