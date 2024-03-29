const { BuyerSignupInfo } = require('./validators/authInfo');
const { BuyerEditInfo } = require('./validators/editProfileInfo');
const {filterPostsInfo } = require('./validators/postInfo');
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const MessageService = require('../services/messageServices');
const FarmerService = require('../services/farmerService');
class BuyerController {
    static async  homePage(req,res){
            try{
                const posts = await PostService.getAllActivePostsForBuyer(req.session.user.uid);
                res.render('buyerHome',{ 
                    error: req.query.error, 
                    user: req.session.user,
                    success: req.query.success,
                    posts:posts,
                    filter_category:req.query.filter_category,
                    filter_district:req.query.filter_district,
                    min_price:req.query.min_price,
                    max_price:req.query.max_price,
                    min_quantity:req.query.min_quantity,
                    max_quantity:req.query.max_qunatity,
                });
            }catch(err){
                res.render('buyerHome',{ 
                    error: err, 
                    user: req.session.user,
                    success: req.query.success,
                    posts:null, // incase of error
                    filter_category:req.query.filter_category,
                    filter_district:req.query.filter_district,
                    min_price:req.query.min_price,
                    max_price:req.query.max_price,
                    min_quantity:req.query.min_quantity,
                    max_quantity:req.query.max_qunatity,
                });
            }
            

    } 

    static async filterPosts(req,res){
        try {
            const { value, error } = await filterPostsInfo.validate(req.body);
            if (error) throw (error);
            const filtered = await PostService.getFilteredPosts(value,req.session.user.uid);
            res.render('buyerHome',{ 
                error: req.query.error, 
                user: req.session.user,
                success: req.query.success,
                posts:filtered,
                filter_category:req.body.filter_category,
                filter_district:req.body.filter_district,
                min_price:req.body.min_price,
                max_price:req.body.max_price,
                min_quantity:req.body.min_quantity,
                max_quantity:req.body.max_quantity,
            });
        } catch (err) {
            res.redirect(
                `/buyer?error=${err}&filter_category=${req.body.filter_category}&filter_district=${req.body.filter_district}&min_price=${req.body.min_price}&max_price=${req.body.max_price}&min_quantity=${req.body.min_quantity}&max_quantity=${req.body.max_quantity}`
                );
        }
    } 

    static signupPage(req,res){
        res.render('buyerSignUp',{ 
            error: req.query.error,
            user : req.session.user,
            email : req.query.email,
            firstName : req.query.firstName,
            lastName : req.query.lastName,
            gender : req.query.gender,
            district : req.query.district,
            nicNumber : req.query.nicNumber,
            contactNo : req.query.contactNo,
             });
    } 

    static async sentRequestsPage(req,res){
        try{
            const requests = await MessageService.getSentMessages(req.session.user.uid);
            res.render('buyerSentRequests',{ 
                error: req.query.error,
                user : req.session.user,
                del_suc: req.query.del_suc,
                requests:requests,
                });
        }catch(err){
            res.redirect(`/buyer?error=${err}`);
        }
    } 
    
    static async signup(req, res) {
        try {
            const { value, error } = await BuyerSignupInfo.validate(req.body);
            if (error) throw (error);
            await UserService.buyerRegister(value);
            res.redirect('/login?buyerRegSuccess=Registration as a Buyer Successful');
        } catch (err) {
            //logger.error(err);
            res.redirect(
                `/buyer/signup?error=${err}&email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&gender=${req.body.gender}&district=${req.body.district}&nicNumber=${req.body.nicNumber}&contactNo=${req.body.contactNo}`
                );
        }
    }

    static async editProfile(req, res) {
        try{
            const { value, error } = await BuyerEditInfo.validate(req.body);
            if (error) throw (error);
            const user = await UserService.buyerUpdate(value,req.params.uid);
            //save edited info to session
            req.session.user.email=user.email;
            req.session.user.name = user.first_name+ " "+user.last_name;
            req.session.user.banned =user.banned; 
            req.session.user.firstName=user.first_name;
            req.session.user.lastName=user.last_name;
            req.session.user.gender=user.gender;
            req.session.user.buyerData=user.buyerData;
            res.redirect('/editProfile?success=Changes saved sucessfully');
        }catch(err){
            //logger.error(err);
            res.redirect(`/editProfile?error=${err}`)
        }
    } 

    //to buyer to see a farmer profile
    static async farmerProfilePage(req,res){
        try{
            const posts = await PostService.getPostsofFarmer(req.params.farmer_id);
            const farmer = await FarmerService.getFarmer(req.params.farmer_id);
            res.render('buyerFarmerProfile',{
                error: req.query.error,
                user: req.session.user,
                report_success:req.query.report_success,
                reasons:req.query.reasons,
                posts:posts.filter((post)=>post.status=='Active'),
                farmer:farmer,
            });

        }catch(e){
            res.redirect(`/buyer/?error=${e}`)
        }
    }
}

module.exports = BuyerController;
