const Product = require('../models/product.model');

module.exports.getAll = (request, response) => {
    Product.find()
    .then(products => response.json({results: products, count: products.length}))
    .catch(error => response.json({error}));
}

module.exports.getProduct = (request, response) => {
    Product.findOne({_id:request.params.id})
        .then(product => response.json(product))
        .catch(error => response.json(error))
}

module.exports.createProduct = (request, response) => {
    const { title, price, description } = request.body;
    Product.create({title, price, description})
        .then(product => response.json(product))
        .catch(error => response.json(error));
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedProduct => response.json(updatedProduct))
        .catch(error => response.json(error))
}

module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(error => response.json(error))
}