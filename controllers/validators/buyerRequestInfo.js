const Joi = require('joi');

const buyerRequestInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().trim().min(5).max(50).required().label("Title"),
    description:Joi.string().trim().min(20).max(800).required().label("Message"),

});


module.exports = { buyerRequestInfo };