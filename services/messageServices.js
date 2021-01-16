const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const BuyerRequest = require('../models/BuyerRequest');

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
        
        return BuyerRequest.addRequest(uid,postid,title,description);
        }

        static async getSentMessages(buyer_uid){
            return BuyerRequest.getSentMessages(buyer_uid);
        }

        static async deleteMsg(msg_id){
            return BuyerRequest.deleteMsg(msg_id);
        }
    }

    
module.exports=messageServices