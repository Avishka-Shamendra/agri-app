const { BuyerSignupInfo } = require('./validators/authInfo');
const { BuyerEditInfo } = require('./validators/editProfileInfo');
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');

class BuyerController {
    static async  homePage(req,res){
        console.log(req.query.filter_category)
        console.log(req.query.filter_district)

        req.query.filter_category=req.query.filter_category=="all"?null:req.query.filter_category;
        req.query.filter_district=req.query.filter_district=="all"?null:req.query.filter_district;

        const posts = await PostService.getAllActivePosts(req.query.filter_category,req.query.filter_district);

        res.render('buyerHome',{ 
            error: req.query.error, 
            user: req.session.user,
            posts:posts,
            filter_category:req.query.filter_category,
            filter_district:req.query.filter_district
         });
    } 

    static async filterPosts(req,res){
        console.log(req.body)
        res.redirect(
            `/buyer?filter_category=${req.body.filter_category}&filter_district=${req.body.filter_district}`
            );
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
}

module.exports = BuyerController;
