const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { setCookies, clearCookies } = require('../utils/user')

const isValid = async (token) => {
    try {
        await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return true
    } catch (e) {
        return false
    }
}

const userAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    try {
        if (await isValid(accessToken) && await isValid(refreshToken)) {
            req.user = await User.findByToken(accessToken)
        } else if (await isValid(refreshToken)) {
            const user = await User.findByToken(refreshToken)
            const newToken = await user.generateAuthToken()
            res = setCookies(res, newToken)
            await user.clearAuthToken(accessToken, refreshToken)
            await user.save()
            req.user = user
        } else {
            const user = await User.findByToken(accessToken)
            await user.clearAuthToken(accessToken, refreshToken)
            res = clearCookies(res)
            await user.save()
            throw new Error('Tokens Expired.')
        }

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).send({ error: 'Failed To Authenticate User.' })
    }
}

module.exports = {
    userAuth
}
