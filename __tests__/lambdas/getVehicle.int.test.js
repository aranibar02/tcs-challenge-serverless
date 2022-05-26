const getVehicle = require('../../lambdas/endpoints/vehicles/getVehicle');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');
const Dynamo = require('../../lambdas/common/Dynamo');

describe('get vehicle integration tests', () => {
    test('it should take an ID and return an API Gateway response', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'sdfsdf3re',
            },
        });

        const res = await getVehicle.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return 400 if we dont pass an ID', async () => {
        const event = eventGenerator({});
        const res = await getVehicle.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test('it should return 204 if it is an incorrect ID', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'sdfsdf3re',
            },
        });

        const res = await getVehicle.handler(event);

        expect(res.statusCode).toBe(204);
    });

    test('returns a 200 and the vehicle data when a valid ID', async () => {
        const ID = '328resnrr4sd';

        const vehicle = {
            ID,
            capacidadDeCarga: "50000",
            consumibles:"2 months",
            costoEnCreditos: "150000",
            tripulacion: "46",
            fabricante: "orellia Mining Corporation",
            velocidadAtmosfericaMaxima: "30",
            modelo: "Digger Crawler",
            nombre: "Sand Crawler",
            pasajeros: "30",
            claseDeVehiculo: "wheeled"
        };
        
        await Dynamo.write(vehicle, process.env.vehicleTableName);

        const event = eventGenerator({
            pathParametersObject: {
                ID,
            },
        });

        const res = await getVehicle.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual(vehicle);
    });
});
