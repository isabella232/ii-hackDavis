const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validateToken } = require('../utils/user')
const { asyncFilter } = require('../utils/misc')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
        //add validation
    },
    avatar: {
        url: {
            type: String,
            // default: something
        },
        buffer: {
            type: Buffer
        }
    },
    tokens: [{
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        }
    }],
}, { discriminatorKey: 'kind', timestamps: true })

// checks that the user exists in database
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('No user found.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Incorrect password.')
    }

    return user
}

// find user by token
userSchema.statics.findByToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({ _id: decoded._id })
    if (!user) {
        throw new Error('No user found.')
    }

    return user
}

// generate new auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const accessToken = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '30 days' })
    const refreshToken = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '31 days' })
    const token = {
        accessToken: accessToken,
        refreshToken: refreshToken
    }

    user.tokens = user.tokens.concat(token)
    await user.save()

    return token
}

// delete expired auth token
userSchema.methods.clearAuthToken = async function (refreshToken) {
    const user = this

    user.tokens = user.tokens.filter((token) => {
        return (token.refreshToken !== refreshToken)
    })

    await user.save()
}

// delete expired auth token
userSchema.methods.clearExpiredTokens = async function () {
    const user = this

    user.tokens = await asyncFilter(user.tokens, async token => {
        return (await validateToken(token.refreshToken))
    })

    await user.save()
}

// check if user is admin
userSchema.methods.isAdmin = async function () {
    if (this.kind === "Admin") {
        return true
    }
    throw new Error("User is not an admin")
}

// doesn't print password or tokens
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    userObject.avatar = userObject.avatar.url

    return userObject
}

// hash the plain text pw before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
