const Joi = require('joi');
const asyncHandler = require('../utils/async-handler');

module.exports = {
    validatePOST: asyncHandler(async (req, res, next) => {
        await Joi.object({
            category: Joi.string().not(null).required(),
            title: Joi.string().not(null).required(),
            description: Joi.string().allow(null, ''),
            address: Joi.string()
                .not(null)
                .required(),
            area: Joi.string().not(null).required(),
            maxPeople: Joi.number().not(null).required(),
            price:Joi.number().not(null).required(),
            deposit:Joi.number().allow(null,''),
            security:Joi.array().items(Joi.string()),
            utils:Joi.array().items(Joi.string()),
            interior:Joi.array().items(Joi.string()),
            images:Joi.array().items(Joi.string()),
            owner:Joi.string().not(null).required(),
        }).validateAsync(req.body, { abortEarly: false });

        next();
    }),
    validatePUT: asyncHandler(async (req, res, next) => {
        await Joi.object({
            title: Joi.string().not(null).required(),
            description: Joi.string().allow(null, ''),
            address: Joi.string()
                .not(null)
                .required(),
            area: Joi.string().not(null).required(),
            maxPeople: Joi.number().not(null).required(),
            price:Joi.number().not(null).required(),
            deposit:Joi.number().allow(null,''),
            security:Joi.array().items(Joi.string()),
            utils:Joi.array().items(Joi.string()),
            interior:Joi.array().items(Joi.string()),
            images:Joi.array().items(Joi.string()),

        }).validateAsync(req.body, { abortEarly: false });

        next();
    }),
};
