const Joi = require('joi');

const addpostInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().max(50).required().label("Post Title"),
    product_name:Joi.string().max(50).required().label("Product Name"),
    quantity:Joi.number().integer().min(0).less(100000000).required().label("Quantity"),
    expected_price:Joi.number().integer().min(0).less(100000000).required().label("Expected Price"),
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

const filterPostsInfo = Joi.object().options({ abortEarly: false }).keys({
    min_quantity:Joi.number().empty('').default(0).integer().min(0).max(100000000).label("Min. Quantity"),
    max_quantity:Joi.number().empty('').default(100000000).integer().min(0).max(100000000).label("Max. Quantity"),
    min_price:Joi.number().empty('').default(0).integer().min(0).max(100000000).label("Min. Price"),
    max_price:Joi.number().empty('').default(100000000).integer().min(0).max(100000000).label("Min. Price"),
    filter_category:Joi.string().valid('vegetable','fruit','all').required().label("Product Category"),
    filter_district: Joi.string().label("District"),
});


module.exports = { addpostInfo, filterPostsInfo };