const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');

class AdminService{
    static async systemStats(){
        //console.log('HER');
        //num of buyers
        const num_buyers = await User.numUsers('buyer');
        //num of farmers
        const num_farmers = await User.numUsers('farmer');
        //num od active post
        const num_active_posts = await Post.numPosts('Active');
        //num of sold posts
        const num_sold_posts = await Post.numPosts('Sold');
        //num of expired posts
        const num_expired_posts = await Post.numPosts('Deleted');

        const systemInfo ={
            num_buyers:num_buyers,
            num_farmers:num_farmers,
            num_active_posts:num_active_posts,
            num_expired_posts:num_expired_posts,
            num_sold_posts:num_sold_posts
        }

        return systemInfo;


    }

    static async deleteAdmin(){

    }
}

module.exports = AdminService;