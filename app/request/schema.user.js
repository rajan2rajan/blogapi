const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required().max(32).min(2).trim(),
    password: joi.string().required().max(32).min(2).trim(),
    // .pattern(new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')),
});

module.exports = userSchema;
