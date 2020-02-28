const accumulateRatings = (newRating, curRating, numRatings) => {
    return (newRating + curRating * numRatings) / (numRatings + 1)
}

const processReviews = (reviews) => {
    if (reviews.length > 50) {
        reviews.splice(0, reviews.length - 50)
    }
    reviews.map(review => {
        const rev = review.toObject()
        delete rev._id
        return rev
    })
    reviews.sort(function (a, b) {
        return b.date - a.date;
    });
    return reviews
}


module.exports = {
    accumulateRatings,
    processReviews
}
