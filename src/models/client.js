const mongoose = require('mongoose')
const User = require('./user')

const clientSchema = new mongoose.Schema({
    bookmarks: [{
        type: String,
        required: true,
        default: []
    }]
})

module.exports = User.discriminator('Client', clientSchema)
