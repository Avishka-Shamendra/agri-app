const Joi = require('joi');

const LogInInfo = Joi.object().options({ abortEarly: false }).keys({
    password: Joi.string().required().label("password"),
    email: Joi.string().required().label("email"),
});

const AdminSignUpInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().max(50).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).label("Confirmation Password")
    .messages({ 'any.only': '{{#label}} does not match "Password"' }),
    firstName: Joi.string().max(20).required().label("First Name"),
    lastName: Joi.string().max(20).required().label("Last Name"),
    gender: Joi.string().valid('Male','Female','Other').required().label("Gender"),
    //admin special
    securityKey: Joi.string().required().label("Security Key"),
});

const FarmerSignupInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().max(50).required().label("Email"),
    password: Joi.string().min(6).max(20).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).label("Confirmation Password")
    .messages({ 'any.only': '{{#label}} does not match "Password"' }),
    firstName: Joi.string().max(20).required().label("First Name"),
    lastName: Joi.string().max(20).required().label("Last Name"),
    gender: Joi.string().valid('Male','Female','Other').required().label("Gender"),
    //farmer special
    nicNumber: Joi.string().required().label("NIC Number")
    .min(10)
    .message('"NIC Number" should be more than 10 digits'),
    contactNo:Joi.string().trim().required()
    .length(10, 'utf8')
    .message('"Contact Number" must be 10 digits')
    .regex(/^\d+$/)
    .message('"Contact Number" contains invalid characters'),
    district: Joi.string().required().label("District"),
    address: Joi.string().required().label("Address")
    
});

const BuyerSignupInfo = Joi.object().options({ abortEarly: false }).keys({
    //commmon user details
    email: Joi.string().email().max(50).required().label("Email"),
    password: Joi.string().min(6).max(20).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).label("Confirmation Password")
    .messages({ 'any.only': '{{#label}} does not match "Password"' }),
    firstName: Joi.string().max(20).required().label("First Name"),
    lastName: Joi.string().max(20).required().label("Last Name"),
    gender: Joi.string().valid('Male','Female','Other').required().label("Gender"),
    // buyer special
    nicNumber: Joi.string().required().label("NIC Number")
    .min(10)
    .message('"NIC Number" should be more than 10 digits'),
    contactNo:Joi.string().trim().required()
    .length(10, 'utf8')
    .message('"Contact Number" must be 10 digits')
    .regex(/^\d+$/)
    .message('"Contact Number" contains invalid characters'),
    district: Joi.string().required().label("District"),
});


module.exports = { LogInInfo, AdminSignUpInfo, BuyerSignupInfo, FarmerSignupInfo };


