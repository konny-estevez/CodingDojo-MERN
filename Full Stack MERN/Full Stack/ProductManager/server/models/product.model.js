const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        message: "The title is required",
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        message: "The price is required",
        min: 0.01,
    },
    description: {
        type: String,
        required: true,
        message: "The description is required ",
        minlength: 3,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
