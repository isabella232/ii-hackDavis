const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }
})

adminCodeSchema.statics.checkMatch = async (code) => {
    const adminCodes = await AdminCode.find({})

    if (!adminCodes) throw new Error('No admin codes exist.')

    for (const adminCode of adminCodes) {
        let isMatch = await bcrypt.compare(code, adminCode.code)
        if (isMatch) return true
    }

    throw new Error('No matched admin codes.')
}

adminCodeSchema.statics.isNew = async (code) => {
    const adminCodes = await AdminCode.find({})

    for (const adminCode of adminCodes) {
        let isMatch = await bcrypt.compare(code, adminCode.code)
        if (isMatch) throw new Error('Admin code already existed.')
    }

    return true
}


// hash the plain text pw before saving
adminCodeSchema.pre('save', async function (next) {
    const adminCode = this

    if (adminCode.isModified('code'))
        adminCode.code = await bcrypt.hash(adminCode.code, 8)

    next()
})

const AdminCode = mongoose.model('adminCode', adminCodeSchema)

module.exports = AdminCode
