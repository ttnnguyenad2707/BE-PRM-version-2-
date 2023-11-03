const asyncHandler = require('../utils/async-handler');
const InteriorService = require("../services/interior.service");


module.exports = {
    
    createOne: asyncHandler(async (req, res) => {
        const post = await InteriorService.createOne(req, res);
    }),

};
