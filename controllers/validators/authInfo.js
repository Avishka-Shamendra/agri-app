const Joi = require('joi');

const LogInInfo = Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const AdminSignUpInfo = Joi.object().keys({
    //commmon user details
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirmation Password"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    //admin special
    securityKey: Joi.string().required(),
});

const FarmerSignupInfo = Joi.object().keys({
    //commmon user details
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confrimation Password"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    //farmer special
    nicNumber: Joi.string().required(),
    contactNumber:Joi.string().required(),
    district: Joi.string().required()
    
});

const BuyerSignupInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirmation Password"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // buyer special
    nicNumber: Joi.string().required(),
    contactNumber:Joi.string().required(),
    district: Joi.string().required()
});


module.exports = { LogInInfo, AdminSignUpInfo, BuyerSignupInfo, FarmerSignupInfo };


