
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const { addpostInfo } = require('./validators/postInfo');
const postServices = require('../services/postServices');
const BuyerRequest = require('../models/BuyerRequest');

class PostController{
    static addPostPage(req, res){
        res.render('farmerAddPost',{
            error: req.query.error,
            user: req.session.user,
            title:req.query.title,
            product_name:req.query.product_name,
            expected_price:req.query.expected_price,
            quantity:req.query.quantity,
            phone_num:req.query.phone_num?req.query.phone_num:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.contact_no:undefined):undefined,
            description:req.query.description,
            address:req.query.address?req.query.address:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.address:undefined):undefined,
            district:req.query.district?req.query.district:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.district:undefined):undefined,
            product_category:req.query.product_category
        });
    }

    static async addPost(req, res){
        try{
            const { value, error } = await addpostInfo.validate(req.body);
            if (error) throw (error);
            const post = await PostService.addPost(req.body,req.session.user.uid);
            res.redirect('/farmer?new_post_success=Your post is now Active .You can view the post in "My Posts" section.Edit your post  or add an image to your post from there if needed.');
        }catch (e) {
            res.redirect(`/farmer/addPost?error=${e}&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}&product_category=${req.body.product_category}&address=${req.body.address}&district=${req.body.district}`);
        }
    }

    static async viewPost(req,res){
        try{
            const post= await PostService.getPost(req.params.postid);
            const request = await BuyerRequest.checkAvailable(req.session.user.uid,req.params.postid);
            res.render('buyerPostPage',{
                error: req.query.error,
                msg_error:req.query.msg_error,
                msg_success:req.query.msg_success,
                user: req.session.user,
                post:post,
                request:request,
                request_title:req.query.request_title,
                description:req.query.description
            });
            
        }
        catch(err){
            res.redirect(`/buyer?error=${err}`);
        }
    }

    static async deletePostAdmin(req,res){
        try{
            await PostService.deletePost(req.params.post_id);
            res.redirect(`/admin/allPosts?success=Post Deleted Successfully`);
        }catch(e){
            res.redirect(`/admin/allPosts?error=${e}`);
        }
    }

    static async deleteFarmerPostAdmin(req,res){
        try{
            await PostService.deletePost(req.params.post_id);
            res.redirect(`/admin/allFarmers?success=Post Deleted Successfully`);
        }catch(e){
            res.redirect(`/admin/allFarmers?error=${e}`);
        }
    }
}

module.exports = PostController;