const Errors = require('../helpers/error');
const User = require('../models/User');
const Farmer = require('../models/Farmer');
const Buyer = require('../models/Buyer');
const Post = require('../models/Post');
const dateFormat = require('../helpers/dateFormat');
const {img_add_keyword_bitstream} = require('../helpers/image_helper');

class postServices{
    static async addPost(details,session,file){
        if (!await Farmer.isUIDRegistetred(session.user.uid)) {
            throw new Errors.BadRequest('Internal Server error');
        }

        const user = await Farmer.getUserById(session.user.uid)

        const combined = {
            ...details,
            ...user
        }

        const date_obj = new Date();
        const added_day = dateFormat.ymd(date_obj);
        const days_till_expire = 10;

        date_obj.setDate(date_obj.getDate()+days_till_expire);

        const expire_date =dateFormat.ymd(date_obj);

        combined['img_url'] = file.originalname;
        combined['status'] = 'Active';
        combined['added_day'] = added_day;
        combined['exp_day'] = expire_date;

        console.log(combined)
        return await Post.createPost(combined);

    }

    static async retrieveAllPosts(all=true,maxPost = 20,strategy = 'newest',filter='None'){

        //labels_sting : "post_id,farmer_id,product_name,title,description,product_category,quantity,expected_price,available_district,available_address,status,added_day,exp_day,encode",
        //             labels : ["post_id","farmer_id","product_name","title","description","product_category","quantity","expected_price","available_district","available_address","status","added_day","exp_day","encode"],
        //

        let Info = {
            all:all,
            maxPost:maxPost
        }

        if(!all){
            Info['maxPost']  = null;
        }

        switch (strategy){
            case "newest":
                Info['sort_param']= "added_day";
                Info['sort_order']= "DESC";
                break;
        }

        switch (filter) {
            case "None":
                Info['WhereClause'] = null;
                break;
        }

        const posts  = await Post.retrieveAllPost(Info);
        posts.forEach((item,index)=>{
            //console.log(item.encode);
            item.encode = img_add_keyword_bitstream(item.encode);
            return item;
        });

        console.log(posts);
        return posts;
    }

    static async getPostofFarmer(uid,limit=null){
        const posts = await Post.getPostsofFarmer(uid,limit,fal);

        posts.forEach((item,index)=>{
            //console.log(item.encode);
            item.encode = img_add_keyword_bitstream(item.encode);
            return item;
        });


        console.log(posts);
        return posts;
    }
}

module.exports = postServices;
