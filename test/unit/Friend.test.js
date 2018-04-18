const { assert } = require('chai');
const Friend = require('../../lib/models/Friend');

describe('Friend model test', () => {
    it('Valid good model', () => {
        const data = {
            name: 'Sam',
            class: 'warrior',
            role: 'Never playing games with us.',
            favoriteCharacters: {
                hots: ['Tychus', 'Butcher', 'Malfurion'],
                starcraft: ['Raynor', 'Karrigan']
            },
            goingToHeaven: false,
            hasJob: true
        };

        const friend = new Friend(data);

        assert.deepEqual(friend.toJSON(), {
            _id: friend._id,
            ...data
        });

        assert.isUndefined(friend.validateSync());
    });
});