const { FarmerSignupInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const BuyerService = require('../services/buyerService');
const { FarmerEditInfo } = require('./validators/editProfileInfo');
const MessageServices = require('../services/messageServices');
const { defaultLogger } = require('../config/logger');
const logger = defaultLogger('farmer-controller');

class FarmerController {
    static async homePage(req,res){
        try{
            const requests =  await MessageServices.getAllNewMessagesForAFarmer(req.session.user.uid);
            res.render('farmerHome',{ 
                error: req.query.error, 
                user: req.session.user,
                new_post_success:req.query.new_post_success,
                requests:requests,
             });

        }catch(e){
        logger.error(e);
        res.render('farmerHome',{ 
            error: req.query.error, 
            user: req.session.user,
            new_post_success:req.query.new_post_success,
            requests:null
         });
        } 
    } 

    static async myPostsPage(req,res){
        try{
        const posts = await PostService.getFarmerPostsById(req.session.user.uid);
        res.render('farmerMyPosts',{
            user:req.session.user,
            error:req.query.error,
            success:req.query.success,
            posts:posts,
            activePosts:posts.filter((post)=>post.status=='Active'),
            soldPosts:posts.filter((post)=>post.status=='Sold'),
            expiredPosts:posts.filter((post)=>post.status=='Expired'),
        });
        }catch(err){
            logger.error(err);
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
            logger.error(err);
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
            logger.error(err);
            res.redirect(`/editProfile?error=${err}`)
        }
    } 


     //to farmer to see a buyer profile
     static async buyerProfilePage(req,res){
        try{
            const buyer = await BuyerService.getBuyer(req.params.buyer_id);
            res.render('farmerBuyerProfilePage',{
                error: req.query.error,
                user: req.session.user,
                report_success:req.query.report_success,
                reasons:req.query.reasons,
                buyer:buyer,
            });

        }catch(e){
            logger.error(e);
            res.redirect(`farmer/?error=${e}`)
        }
    }
}

module.exports = FarmerController;
