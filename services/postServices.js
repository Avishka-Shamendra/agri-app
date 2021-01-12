const Errors = require('../helpers/error');
const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Buyer = require('../models/Buyer');
const Post = require('../models/Post');
const dateFormat = require('../helpers/dateFormat');

class postServices{
    static async addPost(details,uid){
        if (!await Farmer.isUIDRegistetred(uid)) {
            throw new Errors.BadRequest('Internal Server error');
        }

        const user = await Farmer.getUserById(uid)

        const combined = {
            ...details,
            ...user
        }

        const date_obj = new Date();
        const added_day = dateFormat.ymd(date_obj);
        const days_till_expire = 10;

        date_obj.setDate(date_obj.getDate()+days_till_expire);

        const expire_date =dateFormat.ymd(date_obj);


        combined['status'] = 'Active';
        combined['added_day'] = added_day;
        combined['exp_day'] = expire_date;

        console.log(combined)
        return await Post.createPost(combined);

    }
}

module.exports = postServices;
