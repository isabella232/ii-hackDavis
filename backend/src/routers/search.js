const express = require('express')
const Interpreter = require('../models/interpreterProfile')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('/search', async (req, res) => {
    try {
        // const interpreters = await Interpreter.find().elemMatch('certifications', { isValidated: true }).limit(10)
        const userLocation = {
            lat: 48.00,
            lng: -122.00
        }
        // console.log('inter', interpreters)
        const data = {
            userLocation: userLocation,

        }

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
