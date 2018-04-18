const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    class: String,
    role: String,
    favoriteCharacters: {
        hots: Array,
        starcraft: Array
    },
    goingToHeaven: {type: Boolean, required: false},
    hasJob: Boolean
});

module.exports = mongoose.model('Friend', schema);