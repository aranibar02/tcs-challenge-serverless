const createStarship = require('../../lambdas/endpoints/starships/createStarship');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('create starship score integration tests', () => {
    test('it shoudl take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
                name: 'Death Star', 
                model: 'DS-1 Orbital Battle Station', 
                consumables: '3 years', 
                passengers: 843342, 
                crew: 342953
            },
        });

        const res = await createStarship.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('should return a 200 with the starship if the starship is valid', async () => {
        const event = eventGenerator({
            body: {
                name: 'Death Star', 
                model: 'DS-1 Orbital Battle Station', 
                consumables: '3 years', 
                passengers: 843342, 
                crew: 342953
            },
            pathParametersObject: {
                ID: 'jgugvcnje49'
            },
        });
        const res = await createStarship.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            ID: 'jgugvcnje49',
            name: 'Death Star', 
            model: 'DS-1 Orbital Battle Station', 
            consumables: '3 years', 
            passengers: 843342, 
            crew: 342953
        });
    });
});
