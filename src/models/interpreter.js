const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')
const { getCoordinates } = require('../utils/interpreter')

const interpreterSchema = new mongoose.Schema({
    location: {
        str: {
            type: String,
            trim: true,
            required: true,
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: false
    },
    languages: [{
        language: {
            type: String,
            required: true,
        },
        fluency: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
            max: 10
        }
    }],
    certifications: [{
        title: {
            type: String,
            trim: true,
            required: true,
        },
        file: {
            url: {
                type: String,
            },
            buffer: {
                type: Buffer,
                // required: true
            }
        },
        isValidated: {
            type: Boolean,
            default: false
        },
        isRejected: {
            type: Boolean,
            default: false
        },
    }],
    services: [{
        type: String,
    }],
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    reviews: [{
        reviewerName: {
            type: String,
            trim: true,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            trim: true,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: new Date()
        }
    }],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isRejected: {
        type: Boolean,
        required: true,
        default: false
    },
    summary: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    resume: {
        type: Buffer
    }
})

interpreterSchema.methods.generateCoordinates = async function (location) {
    const interpreter = this
    await getCoordinates(location)
        .then(coordinates => {
            interpreter.location.str = location
            interpreter.location.coordinates = coordinates
        })
}

module.exports = User.discriminator('Interpreter', interpreterSchema)
