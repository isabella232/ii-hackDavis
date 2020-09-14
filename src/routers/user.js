const express = require('express')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')
const { setCookies, clearCookies } = require('../utils/user')
const { imgUploader, getAvatarURL } = require('../utils/image')
const { sendResetPasswordPromptEmail, sendResetPasswordConfirmEmail, sendUserVerifiedEmail } = require('../utils/email')

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
        res.status(400).send({ message: e.message })
    }
})

// logout of current session
router.post('/api/user/logout', auth, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        await req.user.clearAuthToken(refreshToken)
        res = clearCookies(res)
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// verify account
router.post('/api/user/:id/verifyAccount', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, { isOfficial: true })
        await user.save()
        await sendUserVerifiedEmail(user.email, user.name)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// check authentication when app starts
router.post('/api/user/authenticate', auth, async (req, res) => {
    try {
        const data = {
            isLoggedIn: true,
            userKind: req.user.kind
        }
        res.status(200).send(data)
    } catch (e) {
        const data = {
            isLoggedIn: false,
            userKind: "Visitor"
        }
        res.status(200).send(data)
    }
})

// logout of all sessions (delete all tokens)
router.post('/api/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res = clearCookies(res)
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// delete account
router.post('/api/user/:email/delete/', auth, async (req, res) => {
    try {
        await User.findOneAndRemove({ email: req.params.email })
        res = clearCookies(res)
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: e.message })
    }
})

// delete interpreter's account
router.post('/api/interpreter/:email/delete/', auth, async (req, res) => {
    try {
        console.log(req.params.email)
        await User.findOneAndRemove({ email: req.params.email })
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// get avatar image url
router.get('/api/user/avatar/:id', async (req, res) => {
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
router.post('/api/user/avatar/:id', auth, imgUploader.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const user = await User.findById(req.params.id)
    user.avatar.buffer = buffer
    user.avatar.url = getAvatarURL(req.params.id)
    await user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ message: error.message })
})

// update user's password
router.patch('/api/user/updatePassword', auth, async (req, res) => {
    const user = req.user

    try {
        if (await bcrypt.compare(req.body.currentPassword, user.password)) {
            user.password = req.body.newPassword
            await user.save()
            res.send()
        } else {
            res.status(400).send({ message: "Current password does not match." })
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

// forget password
router.post('/api/user/:email/forgetPassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        await sendResetPasswordPromptEmail(user.email, user.name, user._id.toString())
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// reset user's password
router.patch('/api/user/:id/resetPassword', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        user.password = req.body.password
        await user.save()
        await sendResetPasswordConfirmEmail(user.email, user.name)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router
