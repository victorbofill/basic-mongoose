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

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('Gets a friend by id', () => {
        return Friend.create(sam).then(roundTrip)
            .then(saved => {
                sam = saved;
                return request.get(`/friends/${sam._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, sam);
            });
    });

    it('Updates a friend', () => {
        sam.role = 'Whatever Sam wants.';

        return request .put(`/friends/${sam._id}`)
            .send(sam)
            .then(( { body }) => {
                assert.deepEqual(body, sam);
                return Friend.findById(sam._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, sam);
            });
    });

    const getFields = ({_id, name, role}) => ({_id, name, role});

    it('Gets all friends by only _id, name, and role', () => {
        return request.get('/friends')
            .then(({ body }) => {
                assert.deepEqual(body, [kasey, sam].map(getFields));
            });
    });
});