const Joi = require('joi');

const buyerRequestInfo = Joi.object().options({ abortEarly: false }).keys({
    title:Joi.string().max(50).required().label("title"),
    description:Joi.string().max(800).required().label("description")

});


module.exports = { buyerRequestInfo };