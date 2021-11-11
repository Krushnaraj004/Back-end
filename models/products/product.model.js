const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    ProductName: {
        type: String,
        trim: true,
        required: true
    },
    Price: {
        type: String,
        trim: true,
        required: true
    },
    Picture: {
        type: String,
    },
    Description: {
        type: String,
    },
});

const ProductModal = model("ProductModal", ProductSchema);

module.exports= ProductModal;