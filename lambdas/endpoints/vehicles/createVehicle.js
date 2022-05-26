const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const tableName = 'vehicle-table'

exports.handler = async event => { 

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' })
    }

    let ID = event.pathParameters.ID
    const vehicle = JSON.parse(event.body)
    vehicle.ID = ID

    //spanish attributes
    const { 
            capacidadDeCarga,
            consumibles, 
            costoEnCreditos, 
            tripulacion, 
            fabricante,
            velocidadAtmosfericaMaxima,
            modelo,
            nombre,
            pasajeros,
            claseDeVehiculo} = vehicle

    if ( typeof capacidadDeCarga !== 'string' || 
         typeof consumibles !== 'string' || 
         typeof costoEnCreditos !== 'string' ||
         typeof tripulacion !== 'string' ||
         typeof fabricante !== 'string' ||
         typeof velocidadAtmosfericaMaxima !== 'string' ||
         typeof modelo !== 'string' ||
         typeof nombre !== 'string' ||
         typeof pasajeros !== 'string' ||
         typeof claseDeVehiculo !== 'string' ) {
             console.log('Validation Failed')
             return Responses._400({ message: 'Couldn\'t register vehicle because of validation errors.'})
         }

    const newVehicle = await Dynamo.write(vehicle, tableName).catch(err => {
        console.log('error in dynamo write', err)
        return null
    });

    if (!newVehicle) {
        return Responses._400({ message: 'Failed to write newVehicle by ID' })
    }

    return Responses._200(newVehicle)
};
