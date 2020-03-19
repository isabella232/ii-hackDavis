const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const User = require('../models/user')

const adminAuth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.token

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!admin) {
            throw new Error('No Admin Found.')
        }

        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ error: 'Fail To Authenticate Admin.' })
    }
}

const userAuth = async (req, res, next) => {
    try {
        // console.log('cookie', req.cookies)
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('No User Found.')
        }

        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Fail To Authenticate User.' })
    }
}

const checkExpiration = async (token) => {
    try {
        await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return false
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return true
        }
    }
}

module.exports = {
    adminAuth,
    userAuth,
    checkExpiration
}
