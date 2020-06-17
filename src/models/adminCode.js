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

// find admin code by token
// userSchema.statics.findByToken = async (token) => {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     const adminCode = await AdminCode.findOne({ _id: decoded._id })
//     if (!adminCode) {
//         throw new Error('No Admin Code Found.')
//     }

//     return adminCode
// }

// checks that the admin code exists in database
adminCodeSchema.statics.checkMatch = async (adminCode) => {
    const codes = await AdminCode.find({})
    let isMatch = false

    if (!codes) {
        throw new Error('No codes exist.')
    }

    for (const code in codes) {
        isMatch = await bcrypt.compare(code, adminCode.code)

        if (isMatch) {
            return true
        }
    }

    return false
}

// hash the plain text pw before saving
adminCodeSchema.pre('save', async function (next) {
    const adminCode = this

    if (adminCode.isModified('code')) {
        adminCode.code = await bcrypt.hash(adminCode.code, 8)
    }

    next()
})

const AdminCode = mongoose.model('adminCode', adminCodeSchema)

module.exports = AdminCode
