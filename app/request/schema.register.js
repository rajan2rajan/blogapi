const joi = require('joi');

const registerSchema = joi.object({
    name: joi.string().required().max(32).min(2).trim(),
    email: joi.string().email().required().max(32).min(2).trim(),
    password: joi.string().required().max(15).min(8).trim(),
    // .pattern(new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')),
});

module.exports = registerSchema;
