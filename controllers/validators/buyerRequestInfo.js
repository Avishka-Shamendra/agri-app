const Joi = require('joi');

const buyerRequestInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().min(5).max(50).required().label("Title"),
    description:Joi.string().min(20).max(800).required().label("Message"),

});


module.exports = { buyerRequestInfo };