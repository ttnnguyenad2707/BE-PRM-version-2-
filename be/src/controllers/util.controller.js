const asyncHandler = require('../utils/async-handler');
const UtilService = require("../services/util.service");


module.exports = {
    
    createOne: asyncHandler(async (req, res) => {
        const post = await UtilService.createOne(req, res);
    }),

};
