const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const Complains =require ('../models/Complains');
const BuyerRequest = require('../models/BuyerRequest');

class AdminService{
    static async systemStats(){
        //num of buyers
        const num_buyers = await User.numUsers('buyer');
        //num of farmers
        const num_farmers = await User.numUsers('farmer');
        //num od active post
        const num_active_posts = await Post.numPosts('Active');
        //num of sold posts
        const num_sold_posts = await Post.numPosts('Sold');
        //num of expired posts
        const num_expired_posts = await Post.numPosts('Expired');
        //num buyer req
        const num_buyer_reqs = await BuyerRequest.getCount();
        //num complains
        const num_complains =  await Complains.getCount();

        const systemInfo ={
            num_buyers:num_buyers,
            num_farmers:num_farmers,
            num_active_posts:num_active_posts,
            num_expired_posts:num_expired_posts,
            num_sold_posts:num_sold_posts,
            num_buyer_reqs:num_buyer_reqs,
            num_complains:num_complains
        }

        return systemInfo;


    }

    static async deleteAllSoldPost(){
        return Post.deleteAllSoldPost();
    }

    static async deleteAllExpiredPost(){
        return Post.deleteAllExpiredPost();
    }

}

module.exports = AdminService;