const { AdminSignUpInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');
const buyerService = require('../services/buyerService');
const farmerService = require('../services/farmerService');
const postService = require('../services/postServices');

class AdminController {
    static homePage(req,res){
        res.render('adminHome',{ 
            error: req.query.error, 
            user: req.session.user,
         });
    } 
    static signupPage(req,res){
        res.render('adminSignUp',{ 
            error: req.query.error, 
            user: req.session.user,
            email: req.query.email,
            firstName: req.query.firstName,
            lastName:req.query.lastName,
            gender:req.query.gender,
            securityKey:req.query.securityKey
         });
    }   
    
    static async signup(req, res) {
        try {
            const { value, error } = await AdminSignUpInfo.validate(req.body);
            if (error) throw (error);
            await UserService.adminRegister(value);
            res.redirect('/login?adminRegSuccess=You are now registered as an system admin. You can now login using your email and password');
        } catch (err) {
            //logger.error(err);
            res.redirect(`/admin/signup?error=${err}&email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&gender=${req.body.gender}&securityKey=${req.body.securityKey}`);
        }
    }

    static async allFarmersPage(req,res){
        const farmers = await farmerService.getFarmers();
        console.log(farmers.count);

        res.render('adminFarmerPage',{
            error: req.query.error,
            user: req.session.user,
            farmers:farmers
        });
    }

    static async allBuyersPage(req,res){
        const buyers = await buyerService.getBuyers();
        //console.log(buyers.count);

        res.render('adminBuyerPage',{
            error: req.query.error,
            user: req.session.user,
            buyers:buyers
        });
    }

    static async allPostsofFarmer(req,res){
        console.log(req.params.uid);
        const posts = await postService.getPostofFarmer(req.params.uid);
        res.render('adminFarmerPostsPage',{
            error: req.query.error,
            user: req.session.user,
            posts:posts.posts,
            farmer_name:posts.farmer_name
        });
    }
}

module.exports = AdminController;
