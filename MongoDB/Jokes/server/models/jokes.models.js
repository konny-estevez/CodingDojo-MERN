const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    setup: String,
    punchLine: String,
    createdAt: Date,
    updatedAt: Date
});

const Joke = mongoose.model("Joke", JokeSchema);

module.exports = Joke;