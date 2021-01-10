const Joi = require('joi');

const LogInInfo = Joi.object().options({ abortEarly: false }).keys({
    password: Joi.string().required().label("password"),
    email: Joi.string().required().label("email"),
});

const AdminSignUpInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirmation Password").messages({
        'object.valid': `Passwords should match`,
      }),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    //admin special
    securityKey: Joi.string().required().label("Security Key"),
});

const FarmerSignupInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confrimation Password"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    //farmer special
    nicNumber: Joi.string().min(10).required().label("NIC Number"),
    contactNo:Joi.string().length(10).pattern(/^[0-9]+$/).required().label("Contact Number"),
    district: Joi.string().required().label("District"),
    address: Joi.string().required().label("Address")
    
});

const BuyerSignupInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirmation Password"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    // buyer special
    nicNumber: Joi.string().min(10).required().label("NIC Number"),

    contactNo:Joi.string().length(10).pattern(/^[0-9]+$/).required().label("Contact Number"),
    district: Joi.string().required().label("District"),
});


module.exports = { LogInInfo, AdminSignUpInfo, BuyerSignupInfo, FarmerSignupInfo };


