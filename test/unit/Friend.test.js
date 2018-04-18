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

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'Expected validation errors and got none');
        return validation.errors;
    };

    it('Required fields working', () => {
        const friend = new Friend({});
        const errors = getValidationErrors(friend.validateSync());
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.goingToHeaven.kind, 'required');
        assert.equal(errors.hasJob.kind, 'required');
    });

    it('Class is enumerated', () => {
        const friend = new Friend({
            name: 'Sam',
            class: 'dog',
        });
        const errors = getValidationErrors(friend.validateSync());
        assert.equal(errors['class'].kind, 'enum');
    });
});