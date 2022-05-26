const createVehicle = require('../../lambdas/endpoints/vehicles/createVehicle');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('create vehicle integration tests', () => {
    test('it should take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
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
            },
        });

        const res = await createVehicle.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('should return a 200 with the vehicle if the vehicle is valid', async () => {
        const event = eventGenerator({
            body: {
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
            },
            pathParametersObject: {
                ID: 'jgugvcnje49'
            },
        });
        const res = await createVehicle.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual(
                {
                    capacidadDeCarga: "50000",
                    consumibles:"2 months",
                    costoEnCreditos: "150000",
                    tripulacion: "46",
                    fabricante: "orellia Mining Corporation",
                    velocidadAtmosfericaMaxima: "30",
                    modelo: "Digger Crawler",
                    nombre: "Sand Crawler",
                    pasajeros: "30",
                    claseDeVehiculo: "wheeled",
                    ID: 'jgugvcnje49' 
                },
            );
    });
});
