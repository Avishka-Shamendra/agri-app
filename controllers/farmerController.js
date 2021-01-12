const { FarmerSignupInfo } = require('./validators/authInfo');
const { addpostInfo } = require('./validators/postinfo')
const UserService = require('../services/userServices');
const PostService = require('../services/postServices')
const FileService = require('../services/fileService');

class FarmerController {
    static homePage(req,res){
        res.render('farmerHome',{
            error: req.query.error,
            user: req.session.user,
         });
    }

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
            const post = await PostService.addPost(req.body,req.session.user.uid);
            await FileService.uploadPostImage(req.file,post.post_id)
            res.redirect('/farmer?farmer_success=Added post Successfully')
        }catch (e) {
            res.redirect(`/farmer/addPost?error=${e}&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}`);
        }
    }

    static signupPage(req,res){
        res.render('farmerSignUp',{ 
            error : req.query.error,
            user : req.session.user,
            email : req.query.email,
            firstName : req.query.firstName,
            lastName : req.query.lastName,
            district : req.query.district,
            nicNumber : req.query.nicNumber,
            contactNo : req.query.contactNo,
            address : req.query.address,
             });
    }
    
    static async signup(req, res) {
        try {
            const { value, error } = await FarmerSignupInfo.validate(req.body);
            if (error) throw (error);
            await UserService.farmerRegister(value);
            res.redirect('/login?farmerRegSuccess=Registration as Farmer Successful');
        } catch (err) {
            //logger.error(err);
            res.redirect(
                `/farmer/signup?error=${err}&email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&district=${req.body.district}&nicNumber=${req.body.nicNumber}&contactNo=${req.body.contactNo}&address=${req.body.address}`
                );
        }
    } 
}

module.exports = FarmerController;
