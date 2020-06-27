const express = require('express')
const Interpreter = require('../models/interpreter')
const { fetchQuote } = require('../utils/homeData')

const router = new express.Router()

router.get('/api/home', async (req, res) => {
    try {
        const quote = fetchQuote()
        const interpreters = await Interpreter.aggregate([
            {
                $match: {
                    'isVerified': true,
                    // 'certifications.isValidated': true,
                    // 'certifications.isRejected': false,
                    rating: { $gt: 2 }
                }
            },
            { $sample: { size: 10 } }
        ])
        const parsedInterpreters = interpreters.map(interpreter => {
            const languages = interpreter.languages.map(lang => lang.language)

            return {
                name: interpreter.name,
                avatar: interpreter.avatar.url,
                languages: languages,
                email: interpreter.email,
                location: interpreter.location.str,
                rating: interpreter.rating
            }
        })

        res.send({
            interpreters: parsedInterpreters,
            quote: quote
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router
