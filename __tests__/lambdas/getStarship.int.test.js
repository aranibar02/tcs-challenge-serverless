const getStarship = require('../../lambdas/endpoints/starships/getStarship');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');
const Dynamo = require('../../lambdas/common/Dynamo');

describe('get starship integration tests', () => {
    test('it should take an ID and return an API Gateway response', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'sdfsdf3re',
            },
        });

        const res = await getStarship.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return 400 if we dont pass an ID', async () => {
        const event = eventGenerator({});
        const res = await getStarship.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test('it should return 204 if it is an incorrect ID', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'sdfsdf3re',
            },
        });

        const res = await getStarship.handler(event);

        expect(res.statusCode).toBe(204);
    });

    test('it should return a 200 and the player data when a valid ID', async () => {
        const ID = '328resnrr4sd';

        const starship = {
            ID: '328resnrr4sd',
            name: 'Death Star', 
            model: 'DS-1 Orbital Battle Station', 
            consumables: '3 years', 
            passengers: 843342, 
            crew: 342953
        };
        await Dynamo.write(starship, process.env.starshipTableName);

        const event = eventGenerator({
            pathParametersObject: {
                ID,
            },
        });

        const res = await getStarship.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual( starship );
    });
});
