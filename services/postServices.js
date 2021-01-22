const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const dateFormat = require('../helpers/dateFormat');
const {img_add_keyword_bitstream} = require('../helpers/image_helper');

class postServices{
    //for home
    static async getRecentPosts(){
        const posts = await Post.getRecentPosts();
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        } 
        return posts;
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
        const posts = await Post.getFarmerPostsById(uid);
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        } 
        return posts;

    }

    static async getAllActivePosts(){
        const posts = await Post.getAllActivePosts();
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        } 
        return posts;
    }

    static async getAllActivePostsForBuyer(buyer_id){
        const posts = await Post.getAllActivePostsWithMsgState(buyer_id);
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        } 
        return posts;
    }

    static async getFilteredPosts({min_price,max_price,min_quantity,max_quantity,filter_category,filter_district},buyer_id){
        if(!min_quantity) min_quantity=0;
        if(!max_quantity) max_quantity=100000000;
        if(!min_price) min_price=0;
        if(!max_price) max_price=100000000;
        if(filter_category==='all') filter_category=null;
        if(filter_district==='all') filter_district=null;
        const posts = await Post.getFilteredPosts(min_price,max_price,min_quantity,max_quantity,filter_category,filter_district,buyer_id);
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        }  
        return posts;
    }


    static async getPostsofFarmer(uid,limit=null){
        const posts = await Post.getPostsofFarmer(uid,limit);
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        }
        return posts;
    }

    //buyer post page
    static async getPost(postid){
        const post =await Post.getPost(postid);
        if(post){
            post.img_b64 = img_add_keyword_bitstream(post.img_b64);
        }
        return post;
    }

    static async getAllPosts(){
        const posts= await Post.getAllPost();
        if(posts){
            posts.forEach((post)=>{
                post.img_b64 = img_add_keyword_bitstream(post.img_b64);
                return post;
            });
        }
        return posts;

    }

    static async deletePost(post_id){
        return Post.deletePost(post_id);
    }

    static async getPostFarmerView(post_id){
        const post = await Post.getPostFarmerView(post_id);
        if(post){
            post.img_b64 = img_add_keyword_bitstream(post.img_b64);
        }
        return post;
    }

    static async markAsSold(post_id){
        return Post.markAsSold(post_id);
    }

    static async updateExpired(){
        return Post.updateExpired();
    }
}

module.exports = postServices;