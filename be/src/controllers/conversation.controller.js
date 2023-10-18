const asyncHandler = require('../utils/async-handler');
const ConversationService = require("../services/conversation.service");


module.exports = {

    createOne: asyncHandler(async (req, res) => {
        const user = await ConversationService.createOne(req, res);
    }),
    getOne: asyncHandler(async (req, res) => {
        const user = await ConversationService.getOne(req, res);
    }),

    updateOne: asyncHandler(async (req, res) => {
        const listUsers = await ConversationService.updateOne(req, res);
    }),


};
