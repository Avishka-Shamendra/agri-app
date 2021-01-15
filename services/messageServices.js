const Errors = require('../helpers/error');
const User = require('../models/User');
const Post = require('../models/Post');
const BuyerRequest = require('../models/BuyerRequest');
const dateFormat = require('../helpers/dateFormat');
const MessageController = require('../controllers/messageController');

class messageServices{
    static async addRequest({
        title,description},uid, postid){
            const user = await User.getUserById(uid);
        if (!user && user.type!='buyer') {
            throw new Errors.Unauthorized('You do not have permission to add new posts');
        }
            const post=await Post.getPost(postid);
        if(!post && post.length[0]){
            throw new Errors.NotFound('there is not a post with requested post id.')
        }
            const request=await BuyerRequest.checkAvailable(uid,postid)
        if(request && request[0]){
            console.log(request)
            throw new Errors.Unauthorized("You have already sent a request to this post")
        }
        
        return BuyerRequest.addRequest(uid,postid,title,description);
        }
    }
module.exports=messageServices