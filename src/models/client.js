const mongoose = require('mongoose')
const User = require('./user')

const clientSchema = new mongoose.Schema({
    // bookmarks : []
})

module.exports = User.discriminator('Client', clientSchema)
