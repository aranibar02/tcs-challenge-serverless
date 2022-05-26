const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = 'starship-table'

exports.handler = async event => { 

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' })
    }

    let ID = event.pathParameters.ID
    const starship = JSON.parse(event.body)
    starship.ID = ID

    const { name, model, consumables, passengers, crew } = starship

    if ( typeof name !== 'string' || 
         typeof model !== 'string' || 
         typeof consumables !== 'string' ||
         typeof passengers !== 'number' ||
         typeof crew !== 'number') {
             console.log('Validation Failed')
             return Responses._400({ message: 'Couldn\'t register starship because of validation errors.'})
         }

    const newStarschip = await Dynamo.write(starship, tableName).catch(err => {
        console.log('error in dynamo write', err)
        return null
    });

    if (!newStarschip) {
        return Responses._400({ message: 'Failed to write newStarschip by ID' })
    }

    return Responses._200(newStarschip)
};
