const Person = require('../models/person.model');

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World from API"
    });
};

module.exports.getAll = (request, response) => {
    Person.find()
    .then(allPersons => response.json(allPersons))
    .catch(error => response.json({error: error}));
}

module.exports.getPerson = (request, response) => {
    Person.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err))
}

module.exports.createPerson = (request, response) => {
    const { firstName, lastName } = request.body;
    Person.create({firstName, lastName})
        .then(person => response.json(person))
        .catch(err => response.json(err));
}

module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}

module.exports.deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}