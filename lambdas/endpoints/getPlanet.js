const { default: axios } = require('axios');
const Responses = require('../common/API_Responses');

const baseUrlApi = process.env.baseUrlApi

const planetResourceUri = (id) => `${baseUrlApi}/planets/${id}`

exports.handler = async event => {

    let ID = event.pathParameters.ID

    if (!event.pathParameters || !ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' })
    }

    const { data } = await axios.get(planetResourceUri(ID)).catch(err => {
        return { data: null }
    })

    if (!data) {
        return Responses._404({ message: `Failed to get planet by ID: ${ID}` })
    }

    return Responses._200({ data })

};
