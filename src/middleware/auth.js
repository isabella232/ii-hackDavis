const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const User = require('../models/user')

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!admin) {
            throw new Error()
        }

        req.token = token
        // req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Fail To Authenticate Admin.' })
    }
}

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Fail To Authenticate User.' })
    }
}

module.exports = {
    adminAuth,
    userAuth
}
