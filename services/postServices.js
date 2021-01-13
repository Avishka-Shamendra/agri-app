const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const dateFormat = require('../helpers/dateFormat');

class postServices{
    static async addPost({
        title,product_name,quantity,expected_price,description,product_category,district,address},uid){
            const user = await User.getUserById(uid);
        if (!user || user.type!='farmer') {
            throw new Errors.Unauthorized('You do not have permission to add new posts');
        }
        const date_obj = new Date();
        const added_day = dateFormat.ymd(date_obj);
        const days_till_expire = 30;
        date_obj.setDate(date_obj.getDate()+days_till_expire);
        const expire_date =dateFormat.ymd(date_obj);
        return Post.createPost(uid,title,product_name,quantity,expected_price,description,product_category,district,address,added_day,expire_date);
    }
}

module.exports = postServices;