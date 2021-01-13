const { addpostInfo } = require('./validators/postinfo')
const UserService = require('../services/userServices');
const PostService = require('../services/postServices')
const FileService = require('../services/fileService');

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
            product_category:req.query.product_category
        });
    }

    static async addPost(req, res){
        try{
            //console.log(req.body.file)
            const { value, error } = await addpostInfo.validate(req.body);
            if (error) throw (error);
            const post = await PostService.addPost(req.body,req.session,req.file);
            await FileService.uploadPostImage(req.file,post.post_id)
            res.redirect('/farmer?farmer_success=Added post Successfully')
        }catch (e) {
            res.redirect(`/farmer/addPost?error=${e}&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}&product_category=${req.body.product_category}`);
        }
    }

    static async retrievePostImage(req,res){
        const img = await FileService.retrievePostImage('7df152ac-6065-4849-a343-b9a1bb05c4bf')
        res.send(`<img src='${img}'/>`);
    }
}

module.exports = PostController;