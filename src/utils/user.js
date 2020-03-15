const ObjectID = require('mongodb').ObjectID
const { getAvatarURL } = require('../utils/image')

const fillSignupInfo = (form, buffer) => {
    const id = ObjectID()
    const info = {
        _id: id,
        name: form.name,
        email: form.email,
        password: form.password,
        avatar: {
            buffer: buffer,
            url: getAvatarURL(id)
        }
    }

    return info
}

module.exports = {
    fillSignupInfo
}
