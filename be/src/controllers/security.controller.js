const asyncHandler = require('../utils/async-handler');
const SecurityService = require("../services/security.service");


module.exports = {
    
    createOne: asyncHandler(async (req, res) => {
        const post = await SecurityService.createOne(req, res);
    }),

};
