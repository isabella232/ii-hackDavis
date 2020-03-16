const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const { userAuth } = require('../middleware/auth')
const bodyParser = require('body-parser')
const { imgUpload } = require('../utils/multer')
const { getAvatarURL } = require('../utils/image')

const router = new express.Router()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// login
router.post('/api/user/login', urlencodedParser, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const data = {
            name: user.name,
            email: user.email,
        }
        res.cookie('token', token, { maxAge: 900000, httpOnly: true })
        res.send(data)
    } catch (e) {
        res.status(400).send()
    }
})

// logout of current session (delete only current token)
router.post('/api/user/logout', userAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.cookies.token
        })
        await req.user.save()
        res.clearCookie('token')
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

// logout of all sessions (delete all tokens)
router.post('/api/user/logoutAll', userAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.clearCookie('token')
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

// get avatar image url
router.get('/api/user/avatar/:id', userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar.buffer)
    } catch (e) {
        res.status(404).send()
    }
})

// upload avatar separately
router.post('/api/user/avatar/:id', userAuth, imgUpload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const user = await User.findById(req.params.id)
    user.avatar.buffer = buffer
    user.avatar.url = getAvatarURL(req.params.id)
    await user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router
