const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const WishlistSchema = new Schema({
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModal",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const WishlistModal = model("WishlistModal", WishlistSchema);

module.exports = WishlistModal;