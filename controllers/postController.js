
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const { addpostInfo } = require('./validators/postInfo');

class PostController{
    static addPostPage(req, res){
        res.render('farmerAddPost',{
            error: req.query.error,
            user: req.session.user,
            title:req.query.title,
            product_name:req.query.product_name,
            expected_price:req.query.expected_price,
            quantity:req.query.quantity,
            phone_num:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.contact_no:undefined):req.query.phone_num,
            description:req.query.description,
            address:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.address:undefined):req.query.address,
            district:req.session.user?(req.session.user.farmerData?req.session.user.farmerData.district:undefined):req.query.district,
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
            res.redirect(`/farmer/addPost?error=${e}&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}&product_category=${req.body.product_category}`);
        }
    }
}

module.exports = PostController;