const asyncHandler = require('../utils/async-handler');
const AuthService=require("../services/auth.service");

module.exports = {

    registerUser: asyncHandler(async (req, res) => {
        const  user= await AuthService.registerUser(req,res);
        res.status(200).json({
            data: user
        })
    }),
    loginUser: asyncHandler(async (req, res) => {
        const user = await AuthService.loginUser(req, res);
    }),

    refreshToken:asyncHandler(async (req, res) => {
        const user = await AuthService.refreshAccessToken(req, res);
    }),

    logoutUser:asyncHandler(async (req, res) => {
        const user = await AuthService.logoutUser(req, res);
    }),
    checkUser:asyncHandler(async (req, res) => {
        const user = await AuthService.checkUser(req, res);
    }),
    
};
