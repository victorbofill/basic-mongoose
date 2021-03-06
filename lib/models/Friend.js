const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {type: String, required: true},
    class: {type: String, enum:['warrior', 'stoner', 'smartass', 'coder', 'architect', 'meatmaster']},
    role: String,
    favoriteCharacters: {
        hots: Array,
        starcraft: Array
    },
    goingToHeaven: {type: Boolean, required: true},
    hasJob: {type: Boolean, required: true}
});

module.exports = mongoose.model('Friend', schema);