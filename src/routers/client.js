const express = require('express')
const sharp = require('sharp')
const Client = require('../models/client')
const auth = require('../middleware/auth')
const { imgUploader } = require('../utils/image')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo, } = require('../utils/user')

const router = new express.Router()

// create client account
router.post('/api/client/create', imgUploader.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const info = fillSignupInfo(req.body, buffer)
        const client = new Client(info)
        sendWelcomeEmail(client.email, client.name)
        await client.save()
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

// get client's profile
router.patch('/api/client/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
