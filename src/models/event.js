const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    image: {
        url: {
            type: String,
        },
        buffer: {
            type: Buffer
        }
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    forInterpreters: {
        type: Boolean,
        default: false
    },
    forClients: {
        type: Boolean,
        default: false
    }
})

eventSchema.methods.toJSON = function () {
    const event = this
    const eventObject = event.toObject()

    eventObject.id = eventObject._id
    eventObject.image = eventObject.image.url
    delete eventObject.__v
    delete eventObject._id

    return eventObject
}

eventSchema.methods.setTarget = async function (target) {
    const event = this
    if (target === 'Everyone') {
        event.forInterpreters = true
        event.forClients = true
    } else if (target === 'Interpreters Only') {
        event.forInterpreters = true
    } else if (target === 'Clients Only') {
        event.forClients = true
    }
}

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
