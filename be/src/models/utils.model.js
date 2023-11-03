const mongoose = require("mongoose");
const Utils = new mongoose.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("Utils", Utils);
