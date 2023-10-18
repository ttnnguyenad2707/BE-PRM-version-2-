const asyncHandler = require('../utils/async-handler');
const UserService = require("../services/user.service");


module.exports = {

    getOne: asyncHandler(async (req, res) => {
        const user = await UserService.getOne(req, res);
    }),
    updateOne: asyncHandler(async (req, res) => {
        const user = await UserService.updateOne(req, res);
    }),
    updateOneForAdmin: asyncHandler(async (req, res) => {
        const user = await UserService.updateUserForAdmin(req, res);
    }),

    getUserlist: asyncHandler(async (req, res) => {
        const listUsers = await UserService.getUserlist(req, res);
    }),


};
