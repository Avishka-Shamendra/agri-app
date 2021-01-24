const Joi = require('joi');

const addpostInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().trim().max(50).required().label("Post Title"),
    product_name:Joi.string().trim().max(50).required().label("Product Name"),
    quantity:Joi.number().integer().min(50).less(100000000).required().label("Quantity"),
    expected_price:Joi.number().integer().min(0).less(10000).required().label("Expected Price"),
    description:Joi.string().trim().max(800).required().label("Description"),
    phone_num:Joi.string().trim().required()
    .length(10, 'utf8')
    .message('"Contact Number" must be 10 digits')
    .regex(/^\d+$/)
    .message('"Contact Number" contains invalid characters'),
    product_category:Joi.string().valid('vegetable','fruit').required().label("Product Category"),
    district: Joi.string().required().label("District"),
    address: Joi.string().trim().required().max(100).label("Address")
});

const filterPostsInfo = Joi.object().options({ abortEarly: false }).keys({
    min_quantity:Joi.number().unsafe().empty('').default(0).integer().min(0).max(100000000).label("Min. Quantity"),
    max_quantity:Joi.number().unsafe().empty('').default(100000000).integer().min(0).max(100000000).label("Max. Quantity"),
    min_price:Joi.number().unsafe().empty('').default(0).integer().min(0).max(10000).label("Min. Unit Price"),
    max_price:Joi.number().unsafe().empty('').default(10000).integer().min(0).max(10000).label("Max. Unit Price"),
    filter_category:Joi.string().valid('vegetable','fruit','all').required().label("Product Category"),
    filter_district: Joi.string().label("District"),
});


module.exports = { addpostInfo, filterPostsInfo };