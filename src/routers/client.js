const express = require('express')
const sharp = require('sharp')
const Client = require('../models/client')
const Event = require('../models/event')
const Interpreter = require('../models/interpreter')
const auth = require('../middleware/auth')
const { imgUploader, getAvatarURL } = require('../utils/image')
const { sendWelcomeEmail } = require('../utils/email')
const { fillSignupInfo } = require('../utils/user')

const router = new express.Router()

// create client account
router.post('/api/client/create', imgUploader.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const info = fillSignupInfo(req.body, buffer)
        const client = new Client(info)
        await sendWelcomeEmail(client.email, client.name, client._id.toString())
        await client.save()
        res.status(201).send()
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e.message })
    }
})

// get client's home page
/*
 * reference: use async/await with map
 * https://zellwk.com/blog/async-await-in-loops/
 */
router.get('/api/client/home', auth, async (req, res) => {
    try {
        const client = req.user
        const now = new Date()
        const events = await Event.find({ 'isArchived': false, 'forClients': true }).where('date').gte(now)
        const promises = client.bookmarks.map(async email => {
            const interpreter = await Interpreter.findOne({ email: email })
            return {
                name: interpreter.name,
                email: interpreter.email,
                languages: interpreter.languages,
                location: interpreter.location.str,
                phone: interpreter.phone,
                rating: interpreter.rating,
            }
        })
        const bookmarks = await Promise.all(promises)
        const data = {
            name: client.name,
            email: client.email,
            avatar: client.avatar.url,
            bookmarks: bookmarks,
            events: events
        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// update client's info
router.patch('/api/client/updateInfo', auth, imgUploader.single('avatar'), async (req, res) => {
    const client = req.user
    try {
        if (req.file) {
            client.avatar.url = getAvatarURL(client._id)
            client.avatar.buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
        }
        client.name = req.body.name
        await client.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/client/bookmarkInterpreter', auth, async (req, res) => {
    const client = req.user
    try {
        const email = req.body.email
        if (!client.bookmarks.includes(email)) client.bookmarks.push(email)
        await client.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch('/api/client/unbookmarkInterpreter', auth, async (req, res) => {
    const client = req.user
    try {
        client.bookmarks = client.bookmarks.filter(email => email !== req.body.email)
        await client.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router
