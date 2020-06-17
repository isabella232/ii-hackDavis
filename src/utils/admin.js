const bcrypt = require('bcryptjs')
const Admin = require('../models/admin')
const AdminCode = require('../models/adminCode')

const getToValidate = (interpreters) => {
    const toValidate = interpreters.map(interpreter => {
        const unvalidatedCertificates = []

        interpreter.certifications.forEach(certificate => {
            if (!certificate.isValidated && !certificate.isRejected) {
                unvalidatedCertificates.push({
                    id: certificate.id,
                    title: certificate.title,
                    image: certificate.file.url
                })
            }
        })

        return {
            name: interpreter.name,
            avatar: interpreter.avatar.url,
            location: interpreter.location.locationString,
            unvalidatedCertificates: unvalidatedCertificates,
        }
    })

    return toValidate
}

const checkAdmin = async (email) => {
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return false
    }
    return true
}

const checkAdminCode = async (code) => {
    const adminCodes = await AdminCode.find({})
    let isMatch = false

    if (!adminCodes) {
        throw new Error('No codes exist.')
    }

    for (const adminCode of adminCodes) {
        isMatch = await bcrypt.compare(code, adminCode.code)

        if (isMatch) {
            return true
        }
    }

    throw new Error('No matches.')
}

module.exports = {
    getToValidate,
    checkAdmin,
    checkAdminCode
}
