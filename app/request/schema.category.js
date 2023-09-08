const joi = require('joi');

const categorySchema = joi.object({
    name: joi.string().required(),
    status: joi.string().valid('active', 'inactive').default('active'),
});

module.exports = categorySchema;
