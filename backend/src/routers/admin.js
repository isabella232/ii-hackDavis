const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// visit admin profile
router.get('/admin/:id/homepage', async (req, res) => {
    User.find({ isAdmin: false })
        .then(result => {
            const interpreters = result.map(interpreter => {
                return {
                    name: interpreter.name,
                    certifications: interpreter.certifications
                }
            })
            const data = { interpreters: interpreters }
            res.status(200).send(data)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send()
        })
})

module.exports = router
