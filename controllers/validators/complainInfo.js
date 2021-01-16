const Joi = require('joi');

const complainInfo = Joi.object().options({ abortEarly: false }).keys({
    reasons:Joi.string().min(20).max(400).required().label("Reasons"),

});


module.exports = { complainInfo };