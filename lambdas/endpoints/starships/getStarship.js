const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = 'starship-table'

exports.handler = async event => {
    
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const starship = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!starship) {
        return Responses._204({ message: 'Failed to get starship by ID' });
    }

    return Responses._200(starship);
};
