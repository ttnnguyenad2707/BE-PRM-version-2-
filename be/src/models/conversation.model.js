const mongoose = require("mongoose");
const Conversation = new mongoose.Schema({
    participants:{
        type:[String],
    },
    messages:[{
        text:{
            type:String
        },
        sender:{
            type:String
        },
        timestamp:{
            type:Date,
            default:Date.now
        }
    }],
}, { timestamps: true });
module.exports = mongoose.model("Conversation", Conversation);