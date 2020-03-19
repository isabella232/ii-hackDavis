const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const { userAuth, checkExpiration } = require('../middleware/auth')
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
        const expireDate = new Date()
        // expireDate.setFullYear(expireDate.getFullYear() + 1) // cookie will expire in 1 years
        expireDate.setSeconds(expireDate.getSeconds() + 20)
        const data = {
            userKind: user.kind,
        }
        res.cookie('token', token, { expires: expireDate, httpOnly: true, sameSite: 'None', secure: true })
        // res.cookie('token', token, { expires: expireDate, httpOnly: true })
        res.send(data)
    } catch (e) {
        console.log(e)
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
        res.clearCookie('token', { sameSite: 'None', secure: true })
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/user/authenticate', async (req, res) => {
    try {
        if (!req.cookies.token) {
            // const user = await User.findOne({ _id: req.body.id })
            // for (let i = 0; i < user.tokens.length; i++) {
            //     if (checkExpiration(user.tokens[i])) {
            //         user.tokens.splice(i, 1)
            //         await user.save()
            //     }
            // }
            res.status(200).send({ isLoggedIn: false })
        } else {
            res.status(200).send({ isLoggedIn: true })
        }
    } catch (e) {
        res.status(401).send({ error: 'Fail To Authenticate User.' })
    }
})

router.post('/api/user/hj', async (req, res) => {
    try {
        if (req.cookies.token) {
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
        res.clearCookie('token')
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

router.get('/api/user/profile', userAuth, async (req, res) => {
    try {
        // console.log(req.user)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }
})

module.exports = router
