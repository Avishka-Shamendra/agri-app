const Joi = require('joi');

const addpostInfo = Joi.object().keys({
    title:Joi.string().required(),
    product_name:Joi.string().required(),
    quantity:Joi.number().required(),
    expected_price:Joi.number().required(),
    description:Joi.string(),
    phone_num:Joi.string().length(10).pattern(/^[0-9]+$/).required().label("Contact Number"),
    product_category:Joi.string().required()
});


module.exports = { addpostInfo };