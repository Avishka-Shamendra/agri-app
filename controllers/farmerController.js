const { FarmerSignupInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const { FarmerEditInfo } = require('./validators/editProfileInfo');

class FarmerController {
    static homePage(req,res){
        res.render('farmerHome',{ 
            error: req.query.error, 
            user: req.session.user,
            new_post_success:req.query.new_post_success,
         });
    } 

    static async myPostsPage(req,res){
        try{
        const posts = await PostService.getFarmerPostsById(req.params.uid);
        res.render('farmerMyPosts',{
            user:req.session.user,
            error:req.query.error,
            posts:posts,
        });
        }catch(err){
            res.redirect(`/farmer?error=${err}`);
        }
    }
    static signupPage(req,res){
        res.render('farmerSignUp',{ 
            error : req.query.error,
            user : req.session.user,
            email : req.query.email,
            firstName : req.query.firstName,
            lastName : req.query.lastName,
            gender : req.query.gender,
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
                `/farmer/signup?error=${err}&email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&gender=${req.body.gender}&district=${req.body.district}&nicNumber=${req.body.nicNumber}&contactNo=${req.body.contactNo}&address=${req.body.address}`
                );
        }
    } 

    static async editProfile(req, res) {
        try{
            const { value, error } = await FarmerEditInfo.validate(req.body);
            if (error) throw (error);
            const user = await UserService.farmerUpdate(value,req.params.uid);
            //save edited info to session
            req.session.user.email=user.email;
            req.session.user.name = user.first_name+ " "+user.last_name;
            req.session.user.banned =user.banned; 
            req.session.user.firstName=user.first_name;
            req.session.user.lastName=user.last_name;
            req.session.user.gender=user.gender;
            req.session.user.farmerData=user.farmerData;
            res.redirect('/editProfile?success=Changes saved sucessfully');
        }catch(err){
            //logger.error(err);
            res.redirect(`/editProfile?error=${err}`)
        }
    } 
}

module.exports = FarmerController;
