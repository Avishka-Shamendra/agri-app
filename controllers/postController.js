const { addpostInfo } = require('./validators/postinfo')
const UserService = require('../services/userServices');
const PostService = require('../services/postServices')
const FileService = require('../services/fileService');

class PostController{
    static addPostPage(req, res){
        res.render('addPost',{
            error: req.query.error,
            user: req.session.user,
            title:req.body.title,
            product_name:req.body.product_name,
            expected_price:req.body.expected_price,
            quantity:req.body.quantity,
            phone_num:req.body.phone_num,
            description:req.body.description
        });
    }

    static async addPost(req, res){
        try{
            //console.log(req.body.file)
            const { value, error } = await addpostInfo.validate(req.body);
            if (error) throw (error);
            const post = await PostService.addPost(req.body,req.session,req.file);
            await FileService.uploadPostImage_manual(req.file,post.post_id)
            res.redirect('/farmer?farmer_success=Added post Successfully')
        }catch (e) {
            res.redirect(`/farmer/addPost?error=${e}title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}`);
        }
    }

    static async retrievePostImage(req,res){
        const img = await FileService.retrievePostImage('e051dc79-1a2b-47f7-a4c1-1df45e903897')
        res.send(`<img src='${img}'/>`);
    }
}

module.exports = PostController;