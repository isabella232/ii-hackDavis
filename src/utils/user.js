const ObjectID = require('mongodb').ObjectID
const { getAvatarURL } = require('../utils/image')

const getExpirationDates = () => {
    const expireDate = new Date()
    const access = new Date()
    const refresh = new Date()
    return {
        access: access.setDate(expireDate.getDay() + 30),
        refresh: refresh.setDate(expireDate.getDay() + 31)
    }

}

const setCookies = (res, token) => {
    const expirationDates = getExpirationDates()

    res.cookie('accessToken', token.accessToken, { expires: expirationDates.access, httpOnly: true, sameSite: 'None', secure: true })
    res.cookie('refreshToken', token.refreshToken, { maxAge: expirationDates.refresh, httpOnly: true, sameSite: 'None', secure: true })

    // Postman testing
    // res.cookie('accessToken', token.accessToken, { expires: expireDate, httpOnly: true })
    // res.cookie('refreshToken', token.refreshToken, { maxAge: 200000, httpOnly: true })

    return res
}

const clearCookies = (res) => {
    res.clearCookie('accessToken', { sameSite: 'None', secure: true })
    res.clearCookie('refreshToken', { sameSite: 'None', secure: true })

    // Postman testing
    // res.clearCookie('accessToken')
    // res.clearCookie('refreshToken')

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
    setCookies,
    clearCookies,
    fillSignupInfo,
}
