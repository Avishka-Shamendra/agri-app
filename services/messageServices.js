const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const BuyerRequest = require('../models/BuyerRequest');
const dateFormat = require('../helpers/dateFormat');

class messageServices{
    static async addRequest({
        title,description},uid, postid){
            const user = await User.getUserById(uid);
        if (!user && user.type!='buyer') {
            throw new Errors.Unauthorized('You do not have permission to add new posts');
        }
            const post=await Post.getPost(postid);
        if(!post && post.length[0]){
            throw new Errors.BadRequest('OOPS could not send message');
        }
        const request=await BuyerRequest.checkAvailable(uid,postid);
        if(request){
            throw new Errors.Unauthorized("You have already sent a request to this post");
        }

        //change
        const date_obj = dateFormat.changeTimezoneToLk(new Date());
        const added_day = dateFormat.ymd(date_obj);
        
        return BuyerRequest.addRequest(uid,postid,title,description,added_day);
        }

        static async getSentMessages(buyer_uid){
            return BuyerRequest.getSentMessages(buyer_uid);
        }

        static async deleteMsg(msg_id){
            return BuyerRequest.deleteMsg(msg_id);
        }

        static async getAllMessagesForAdmin(){
            return BuyerRequest.getAllMessagesForAdmin();
        }
        static async getAllNewMessagesForAFarmer(farmer_id){
            return BuyerRequest.getAllNewMessagesForAFarmer(farmer_id);
        }

        static async getFarmerAllMessagesForAPost(post_id){
            return BuyerRequest.getFarmerAllMessagesForAPost(post_id);
        }
    }

    
module.exports=messageServices