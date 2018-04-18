const { assert } = require('chai');
const request = require('./request');
const Friend = require('../../lib/models/Friend');
const { dropCollection } = require('./db');

describe('Friend API', () => {
    before(() => dropCollection('friends'));

    let kasey = {
        name: 'Kasey',
        class: 'meatmaster',
        role: 'Making sausage and brisket.',
        favoriteCharacters: {
            hots: ['butcher', 'thrall'],
            starcraft: ['fenix', 'artanis']
        },
        goingToHeaven: false,
        hasJob: true
    };

    let sam = {
        name: 'Sam',
        class: 'warrior',
        role: 'Motorcycles and guns and tools',
        favoriteCharacters: {
            hots: ['malfurion', 'tychus', 'diablo'],
            starcraft: ['raynor', 'swann']
        },
        goingToHeaven: false,
        hasJob: true
    };

    it('Saves and retrieves a friend', () => {
        return request.post('/friends')
            .send(kasey)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...kasey
                });
                kasey = body;
            });
    });
});