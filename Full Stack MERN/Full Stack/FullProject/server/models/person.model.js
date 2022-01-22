const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
}, { timestamps: true });

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
