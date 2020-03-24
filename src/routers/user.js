const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const { userAuth } = require('../middleware/auth')
const bodyParser = require('body-parser')
const { setCookies, clearCookies } = require('../utils/user')
const { imgUploader, getAvatarURL } = require('../utils/image')

const router = new express.Router()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// login
router.post('/api/user/login', urlencodedParser, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        await user.clearExpiredTokens()
        const token = await user.generateAuthToken()
        const data = {
            userKind: user.kind,
        }
        res = setCookies(res, token)
        res.send(data)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

// logout of current session
router.post('/api/user/logout', userAuth, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        await req.user.clearAuthToken(refreshToken)
        res = clearCookies(res)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/api/user/authenticate', userAuth, async (req, res) => {
    try {
        const data = {
            isLoggedIn: true,
            userKind: req.user.kind
        }
        res.status(200).send(data)
    } catch (e) {
        res.status(401).send({ error: 'User not logged in.' })
    }
})

router.post('/api/user/hj', async (req, res) => {
    try {
        if (req.cookies.accessToken) {
            res.status(200).send('hj')
        } else {
            res.status(500).send()
        }
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// logout of all sessions (delete all tokens)
router.post('/api/user/logoutAll', userAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res = clearCookies(res)
        res.send()
    } catch (e) {
        res.status(500).send()
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
router.post('/api/user/avatar/:id', userAuth, imgUploader.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const user = await User.findById(req.params.id)
    user.avatar.buffer = buffer
    user.avatar.url = getAvatarURL(req.params.id)
    await user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/api/user/profile', userAuth, async (req, res) => {
    try {
        res.send()
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }
})

module.exports = router
