const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')
const { getCoordinates } = require('../utils/geocoder')

// returns a model with overlapping schema with the user
const interpreterSchema = new mongoose.Schema({
    // location
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
    // indigenous language fluency
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
    // english fluency
    englishFluency: {
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 5
    },
    // certifications
    certifications: [{
        title: {
            type: String,
            trim: true,
            required: true,
        },
        file: {
            type: Buffer,
            required: true
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
    // type of interpreting: simultaneous, etc
    service: {
        type: String,
        trim: true,
        lowercase: true
    },
    // rating
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    // reviews
    reviews: [{
        userName: {
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
        default: false
    },
    summary: {
        type: String,
        trim: true,
        maxlength: 2000
    }
})

interpreterSchema.methods.generateCoordinates = async function (location) {
    const interpreter = this
    const coordinates = await getCoordinates(location)
        .then(coordinates => {
            interpreter.location.coordinates = coordinates
        })
}

module.exports = User.discriminator('Interpreter', interpreterSchema)
