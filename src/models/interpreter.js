const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')
const { getCoordinates } = require('../utils/interpreter')

const interpreterSchema = new mongoose.Schema({
    location: {
        locationString: {
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
            max: 5
        }
    }],
    // englishFluency: {
    //     type: Number,
    //     trim: true,
    //     required: true,
    //     min: 1,
    //     max: 5
    // },
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
    service: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
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
    summary: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    resume: {
        type: Buffer,
    }
})

interpreterSchema.methods.generateCoordinates = async function (location) {
    const interpreter = this
    await getCoordinates(location)
        .then(coordinates => {
            interpreter.location.locationString = location
            interpreter.location.coordinates = coordinates
        })
}

module.exports = User.discriminator('Interpreter', interpreterSchema)
