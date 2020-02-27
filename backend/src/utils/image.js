const getImageURL = (id) => {
    return `${process.env.BACKEND_URL}/users/${id}/avatar`
}

module.exports = {
    getImageURL
}
