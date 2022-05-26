const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = 'vehicle-table'

exports.handler = async event => {
    
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const vehicle = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!vehicle) {
        return Responses._204({ message: 'Failed to get vehicle by ID' });
    }

    return Responses._200(vehicle);
};
