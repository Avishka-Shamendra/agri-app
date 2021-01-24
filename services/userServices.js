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

    static async deleteAccount({ del_password },uid) {
        const user = await User.getUserById(uid);
        if (!user) {
            throw new Errors.BadRequest('OOPS could not delete user');
        }
        const hashedPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(del_password, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Password Entered Not Valid');
        }
        await User.deleteAccount(uid);
        return true;
    }

    static async deleteAccountAdmin({ del_password },admin_uid,profile_uid) {
        const user = await User.getUserById(profile_uid);
        const admin = await User.getUserById(admin_uid);
        if (!user || !admin) {
            throw new Errors.BadRequest('OOPS something went wrong could not delete account');
        }
        const hashedPassword = admin.password;
        const isPasswordCorrect = await bcrypt.compare(del_password, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Password Entered Not Valid');
        }
        await User.deleteAccount(profile_uid);
        return true;
    }

    static async adminRegister({
        firstName,lastName,gender , email, password,confirmPassword, securityKey,
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
        return User.createUser(firstName,lastName,gender,email, hashedPassword);
    }

    static async adminUpdate({
        firstName,lastName,gender , email
    },uid) {


        const user = await User.findUser(email);
        if (user && user.uid!=uid) {
            throw new Errors.BadRequest(' Email is already registered');
        }
        return User.updateUser(firstName,lastName,gender,email,uid);
    }

    static async farmerRegister({
        firstName,lastName,gender,email, password,confirmPassword, nicNumber, contactNo, address, district
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest(' Passwords does not match, please retype password');
        }

        const isRegistered = await User.isEmailRegistetred(email);
        if (isRegistered) {
            throw new Errors.BadRequest(' Email is already registered');
        }

        const isNICRegistered = await User.isNICregistered(nicNumber);
        if (isNICRegistered) {
            throw new Errors.BadRequest(' NIC is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return Farmer.create(firstName,lastName,gender,email, hashedPassword, nicNumber, contactNo, address, district);
    }

    static async farmerUpdate({
        firstName,lastName,gender,email, nicNumber, contactNo, address, district
    },uid) {


        const user = await User.findUser(email);
        if (user && user.uid!=uid) {
            throw new Errors.BadRequest(' Email is already registered');
        }
        const isNICRegistered = await User.isNICregistered(nicNumber);
        if (isNICRegistered) {
            throw new Errors.BadRequest(' NIC is already registered');
        }
        
        return Farmer.updateFarmer(firstName,lastName,gender,email, nicNumber, contactNo, address, district,uid);
    }

    static async buyerRegister({
        firstName,lastName,gender,email, password,confirmPassword, nicNumber, contactNo, district
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest(' Passwords does not match, please retype password');
        }

        const isRegistered = await User.isEmailRegistetred(email);
        if (isRegistered) {
            throw new Errors.BadRequest(' Email is already registered');
        }

        const isNICRegistered = await User.isNICregistered(nicNumber);
        if (isNICRegistered) {
            throw new Errors.BadRequest(' NIC is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return Buyer.create(firstName,lastName,gender,email, hashedPassword, nicNumber, contactNo, district);
    }

    static async buyerUpdate({
        firstName,lastName,gender,email, nicNumber, contactNo, district
    },uid) {


        const user = await User.findUser(email);
        if (user && user.uid!=uid) {
            throw new Errors.BadRequest(' Email is already registered');
        }
        const isNICRegistered = await User.isNICregistered(nicNumber);
        if (isNICRegistered) {
            throw new Errors.BadRequest(' NIC is already registered');
        }
        return Buyer.updateBuyer(firstName,lastName,gender,email, nicNumber, contactNo, district,uid);
    }

    static async changePassword({old_pwd,new_pwd,confirm_pwd},uid){
        const user = await User.getUserById(uid);
        const hashedPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(old_pwd, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Current Password is not correct');
        }
        const newhashedPassword = await bcrypt.hash(new_pwd, 10);
        return User.updatePassword(newhashedPassword,uid);

    }

    static async banUser(uid){
        const userInfo = await User.banUser(uid);
        if(userInfo){
            return `${userInfo.first_name} ${userInfo.last_name}`;
        }else {
            throw new Errors.BadRequest('Error occured while banning user');
        }
    }

    static async unbanUser(uid){
        const userInfo = await User.unbanUser(uid);
        if(userInfo){
            return `${userInfo.first_name} ${userInfo.last_name}`;
        }else {
            throw new Errors.InternalServerError(' Error occured while removing the ban');
        }
    }

    static async getUserNameLike(name_query){
        return await User.getFarmerByNameLike(name_query);
    }
}

module.exports = UserService;
