const bcrypt = require('bcrypt');
const Errors = require('../helpers/error');
const User = require('../models/User');

class UserService {
    static async login({ email, password }) {
        const user = await User.findOne({ email: email });
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
}

module.exports = UserService;
