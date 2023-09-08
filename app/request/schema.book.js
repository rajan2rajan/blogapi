const joi = require('joi');

const bookSchema = joi.object({
    name: joi.string().required().max(32).min(2).trim(),
    isbn: joi.string().required().max(32).min(2).trim(),
    price: joi.string().required().max(5).min(3).trim(),
    category: joi.string().required(),
});

module.exports = bookSchema;
