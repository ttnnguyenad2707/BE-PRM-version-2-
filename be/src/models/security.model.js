const mongoose = require("mongoose");
const Security = new mongoose.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("Security", Security);
