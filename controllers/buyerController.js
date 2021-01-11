const { BuyerSignupInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');

class BuyerController {
    static homePage(req,res){
        res.render('buyerHome',{ 
            error: req.query.error, 
            user: req.session.user,
         });
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
}

module.exports = BuyerController;
