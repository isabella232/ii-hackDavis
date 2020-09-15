const User = require('../models/user')
const { setCookies } = require('../utils/user')
const { validateToken } = require('../utils/user')

const auth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    try {
        if (await validateToken(accessToken) && await validateToken(refreshToken)) {
            req.user = await User.findByToken(accessToken)
        } else if (await validateToken(refreshToken)) {
            const user = await User.findByToken(refreshToken)
            const newToken = await user.generateAuthToken()
            res = setCookies(res, newToken)
            await user.clearAuthToken(refreshToken)
            await user.save()
            req.user = user
        } else {
            throw new Error({ message: 'Failed To Authenticate User.' })
        }

        next()
    } catch (e) {
        throw new Error({ message: 'Failed To Authenticate User.' })
    }
}

module.exports = auth
