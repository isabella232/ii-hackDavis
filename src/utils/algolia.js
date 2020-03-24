const algoliasearch = require('algoliasearch')

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

const parseInterpreter = (interpreter) => {
    const languagues = interpreter.languages.map(lang => ({
        language: lang.language,
        fluency: lang.fluency
    }))
    const coordinates = {
        lat: interpreter.location.coordinates.latitude,
        lng: interpreter.location.coordinates.longitude
    }

    return {
        name: interpreter.name,
        avatar: interpreter.avatar.url,
        email: interpreter.email,
        languages: languagues,
        location: interpreter.location.locationString,
        summary: interpreter.summary,
        objectID: interpreter._id,
        _geoloc: coordinates
    }
}

const saveInterpreter = async (interpreter) => {
    const data = parseInterpreter(interpreter)
    try {
        await index.saveObject(data)
    } catch (error) {
        throw error
    }
}

module.exports = {
    saveInterpreter,
}
