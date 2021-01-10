const bcrypt = require('bcrypt');
const crypto =require('crypto');
const Errors = require('../helpers/error');
const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Buyer = require('../models/Buyer');

class UserService {
    static async login({ email, password }) {
        const user = await User.findUser(email);
        if (!user) {
            throw new Errors.BadRequest('Email is not registered');
        }
        const hashedPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Invalid Email/password');
        }
        return user;
    }

    static async adminRegister({
        firstName,lastName, email, password,confirmPassword, securityKey,
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest(' Passwords does not match, please retype password');
        }

        if (securityKey !== process.env.REG_KEY) {
            throw new Errors.Unauthorized(' Provided Security Key Invalid');
        }

        const isRegistered = await User.isEmailRegistetred(email);
        if (isRegistered) {
            throw new Errors.BadRequest(' Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return User.createUser(firstName,lastName,email, hashedPassword);
    }

    static async farmerRegister({
        firstName,lastName, email, password,confirmPassword, nicNumber, contactNo, address, district
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest(' Passwords does not match, please retype password');
        }

        const isRegistered = await User.isEmailRegistetred(email);
        if (isRegistered) {
            throw new Errors.BadRequest(' Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return Farmer.create(firstName,lastName,email, hashedPassword, nicNumber, contactNo, address, district);
    }

    static async buyerRegister({
        firstName,lastName, email, password,confirmPassword, nicNumber, contactNo, district
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest(' Passwords does not match, please retype password');
        }

        const isRegistered = await User.isEmailRegistetred(email);
        if (isRegistered) {
            throw new Errors.BadRequest(' Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return Buyer.create(firstName,lastName,email, hashedPassword, nicNumber, contactNo, district);
    }
}

module.exports = UserService;
