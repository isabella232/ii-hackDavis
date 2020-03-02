const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
    title: {
        type: String,
        trim: true,
        required: true
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        url: {
            type: String,
        },
        image: {
            type: Buffer
        }
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = Event
