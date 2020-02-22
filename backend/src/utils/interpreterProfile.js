const accumulateRatings = (newRating, curRating, numRatings) => {
    return (newRating + curRating * numRatings) / (numRatings + 1)
}

module.exports = {
    accumulateRatings
}
