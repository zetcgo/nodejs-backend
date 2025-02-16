const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Person',
    new mongoose.Schema({
        name: String,
        age: Number,
        email: { type: String, unique: true },
    }),
    'person',
);
