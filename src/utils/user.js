const jwt = require('jsonwebtoken')
const ObjectID = require('mongodb').ObjectID
const { getAvatarURL } = require('../utils/image')

const getExpirationDate = (date, days) => {
    const copy = new Date(date)
    copy.setDate(copy.getDate() + days);
    return copy
}

const validateToken = async (token) => {
    try {
        await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return true
    } catch (e) {
        return false
    }
}

const setCookies = (res, token) => {
    const now = new Date()
    const accessExp = getExpirationDate(now, 30)
    const refreshExp = getExpirationDate(now, 31)

    // res.cookie('accessToken', token.accessToken, { expires: accessExp, httpOnly: true, sameSite: 'None', secure: true })
    // res.cookie('refreshToken', token.refreshToken, { expires: refreshExp, httpOnly: true, sameSite: 'None', secure: true })

    // Postman testing
    res.cookie('accessToken', token.accessToken, { expires: accessExp, httpOnly: true })
    res.cookie('refreshToken', token.refreshToken, { expires: refreshExp, httpOnly: true })

    return res
}

const clearCookies = (res) => {
    // res.clearCookie('accessToken', { sameSite: 'None', secure: true })
    // res.clearCookie('refreshToken', { sameSite: 'None', secure: true })

    // Postman testing
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    return res
}

const fillSignupInfo = (form, buffer) => {
    const id = ObjectID()
    const info = {
        _id: id,
        name: form.name,
        email: form.email,
        password: form.password,
        avatar: {
            buffer: buffer,
            url: getAvatarURL(id)
        }
    }

    return info
}

module.exports = {
    getExpirationDate,
    validateToken,
    setCookies,
    clearCookies,
    fillSignupInfo,
}
