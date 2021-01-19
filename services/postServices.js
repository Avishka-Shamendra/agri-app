const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const dateFormat = require('../helpers/dateFormat');

class postServices{
    //for home
    static async getRecentPosts(){
        return Post.getRecentPosts();
    }

    static async addPost({
        title,product_name,quantity,expected_price,description,product_category,district,address,phone_num},uid){
            const user = await User.getUserById(uid);
        if (!user || user.type!='farmer') {
            throw new Errors.Unauthorized('You do not have permission to add new posts');
        }
        const date_obj = new Date();
        const added_day = dateFormat.ymd(date_obj);
        const days_till_expire = 30;
        date_obj.setDate(date_obj.getDate()+days_till_expire);
        const expire_date =dateFormat.ymd(date_obj);
        return Post.createPost(uid,title,product_name,quantity,expected_price,description,product_category,district,address,phone_num,added_day,expire_date);
    }

    static async getFarmerPostsById(uid){
        return Post.getFarmerPostsById(uid);
    }

    static async getAllActivePosts(){
        return Post.getAllActivePosts();
    }

    static async getAllActivePostsForBuyer(buyer_id){
        return Post.getAllActivePostsWithMsgState(buyer_id);
    }

    static async getFilteredPosts({min_price,max_price,min_quantity,max_quantity,filter_category,filter_district},buyer_id){
        if(!min_quantity) min_quantity=0;
        if(!max_quantity) max_quantity=100000000;
        if(!min_price) min_price=0;
        if(!max_price) max_price=100000000;
        if(filter_category==='all') filter_category=null;
        if(filter_district==='all') filter_district=null;
        return Post.getFilteredPosts(min_price,max_price,min_quantity,max_quantity,filter_category,filter_district,buyer_id);
    }


    static async getPostsofFarmer(uid,limit=null){
        const posts = await Post.getPostsofFarmer(uid,limit);
        return posts;
    }

    static async getPost(postid){
        return await Post.getPost(postid);
    }

    static async getAllPosts(){
        return await Post.getAllPost();
    }

    static async deletePost(post_id){
        return await Post.deletePost(post_id);
    }

    static async deleteSoldExpiredPosts(){
        await Post.deleteSoldExpiredPost();
    }
}

module.exports = postServices;