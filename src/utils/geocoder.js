const NodeGeocoder = require('node-geocoder')

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GOOGLE_MAP_API_KEY,
}

var geocoder = NodeGeocoder(options)

const getCoordinates = async (address) => {
    try {
        let data = await geocoder.geocode(address)
        if (data.length) {
            data = data[0]
        }
        return {
            latitude: data.latitude,
            longitude: data.longitude
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getCoordinates
}
