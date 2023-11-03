const mongoose = require("mongoose");

const Images = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model("Images", Images);