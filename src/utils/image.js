const getAvatarURL = (id) => {
    // return `${process.env.BACKEND_URL}/api/users/${id}/image`
    return `${process.env.PROD_BACKEND_URL}/api/user/avatar/${id}`
}

const getCertificateURL = (id) => {
    // return `${process.env.BACKEND_URL}/api/users/${id}/image`
    return `${process.env.PROD_BACKEND_URL}/api/interpreter/certificates/${id}`
}

const getEventImageURL = (id) => {
    // return `${process.env.BACKEND_URL}/api/users/${id}/image`
    return `${process.env.PROD_BACKEND_URL}/api/events/${id}`
}


module.exports = {
    getAvatarURL,
    getCertificateURL,
    getEventImageURL
}
