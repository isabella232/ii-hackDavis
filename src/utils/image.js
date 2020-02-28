const getImageURL = (id) => {
    return `${process.env.BACKEND_URL}/api/users/${id}/avatar`
}

module.exports = {
    getImageURL
}
