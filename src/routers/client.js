const express = require('express')
const sharp = require('sharp')
const Client = require('../models/client')
const { userAuth } = require('../middleware/auth')
const { imgUpload } = require('../utils/multer')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo } = require('../utils/user')

const router = new express.Router()

router.post('/api/client/create', imgUpload.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const info = fillSignupInfo(req.body, buffer)
        const client = new Client(info)
        sendWelcomeEmail(client.email, client.name)
        const token = await client.generateAuthToken()
        await client.save()
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.patch('/api/client/me', userAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
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
