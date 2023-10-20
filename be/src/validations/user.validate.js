const Joi = require('joi');
const asyncHandler = require('../utils/async-handler');

module.exports = {
    validatePOST: asyncHandler(async (req, res, next) => {
        await Joi.object({
            firstname: Joi.string().allow(null, ''),
            lastname: Joi.string().allow(null, ''),
            email: Joi.string()
                .email()
                .not(null)
                .only()
                .required(),
            password: Joi.string()
                .min(8)
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa và một số
                .required(),
        }).validateAsync(req.body, { abortEarly: false });

        next();
    }),
    validatePUT: asyncHandler(async (req, res, next) => {
        await Joi.object({
            firstname: Joi.string().allow(null, ''),
            lastname: Joi.string().allow(null, ''),
            email: Joi.string()
                .email()
                .not(null)
                .only()
                .required(),

                phone: Joi.number()
                .allow('', null)
                .min(10),
                
            // password: Joi.string()
            //     .min(8)
            //     .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa và một số
            //     .required(),
        }).validateAsync(req.body, { abortEarly: false });

        next();
    }),
};
