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

const accumulateRatings = (newRating, curRating, numRatings) => {
    return (newRating + curRating * numRatings) / (numRatings + 1)
}

const processReviews = (reviews) => {
    if (reviews.length > 50) {
        reviews.splice(0, reviews.length - 50)
    }
    const revs = reviews.map(review => {
        const rev = review.toObject()
        delete rev._id
        return rev
    })
    revs.sort(function (a, b) {
        return b.date - a.date;
    });
    return revs
}


module.exports = {
    getCoordinates,
    accumulateRatings,
    processReviews
}
