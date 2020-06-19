const express = require('express')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const Client = require('../models/client')
const auth = require('../middleware/auth')
const { imgUploader } = require('../utils/image')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo } = require('../utils/user')

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

// get client's home page
router.get('/api/client/home', auth, async (req, res) => {
    try {
        const client = req.user
        const data = {
            name: client.name,
            email: client.email,
            avatar: client.avatar.url,
            bookmarks: ["Yee", "Yoo"]
        }
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

// update client's info
router.patch('/api/client/updateInfo', auth, imgUploader.single('avatar'), async (req, res) => {
    const client = req.user
    const updates = Object.keys(req.body)

    if (req.body.avatar) {
        client.buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    }

    try {
        updates.forEach((update) => {
            if (req.body[update] !== null) {
                client[update] = req.body[update]
            }
        })
        await client.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
