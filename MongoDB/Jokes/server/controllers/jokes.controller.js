//const faker = require('faker');
const Jokes = require('../models/jokes.models');

module.exports.findAll = (req, res) => {
    Jokes.find()
      .then(allJokes => res.json({ jokes: allJokes }))
      .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOne = (req, res) => {
    Jokes.findOne({_id: req.params._id})
        .then(oneJoke => res.json({joke: oneJoke}))
        .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.findOneRandom = (req, res) => {
    let skip = Math.floor(Math.random() * Jokes.count);
    Jokes.findOne().skip(skip).limit(1)
    .then(oneJoke => res.json({joke: oneJoke}))
    .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.create = (req, res) => {
    let newJoke = req.body;
    newJoke.createdAt = new Date();
    newJoke.updatedAt = new Date();
    Jokes.create(newJoke)
        .then(newJoke => res.json({joke: newJoke}))
        .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.new = (req, res) => {
    let newJoke = {
        setup: "setup",
        punchLine: "punchLine",
        createdAt: new Date(),
        updatedAt: new Date()
    };
    Jokes.create(newJoke)
        .then(newJoke => res.json({joke: newJoke}))
        .catch(err => res.json({ message: "Something went wrong", error: err}));
}

module.exports.update = (req, res) => {
    Jokes.findOneAndUpdate({_id: req.params._id}, req.body, {new: true})
        .then(updatedJoke => res.json({ joke: updatedJoke}))
        .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.delete = (req, res) => {
    Jokes.findOneAndDelete({_id: req.params._id})
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};