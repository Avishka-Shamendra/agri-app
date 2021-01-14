const Joi = require('joi');

const addpostInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().max(50).required().label("Post Title"),
    product_name:Joi.string().max(50).required().label("Product Name"),
    quantity:Joi.number().integer().min(0).less(1000000).required().label("Quantity"),
    expected_price:Joi.number().integer().min(0).required().label("Expected Price"),
    description:Joi.string().max(800).required().label("Description"),
    phone_num:Joi.string().trim().required()
    .length(10, 'utf8')
    .message('"Contact Number" must be 10 digits')
    .regex(/^\d+$/)
    .message('"Contact Number" contains invalid characters'),
    product_category:Joi.string().valid('vegetable','fruit').required().label("Product Category"),
    district: Joi.string().required().label("District"),
    address: Joi.string().required().label("Address")
});


module.exports = { addpostInfo };