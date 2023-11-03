const asyncHandler = require('../utils/async-handler');
const CategoryService = require("../services/category.service");

module.exports = {
    
    createOne: asyncHandler(async (req, res) => {
        const post = await CategoryService.createOne(req, res);
    }),

};
