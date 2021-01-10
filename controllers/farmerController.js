const { FarmerSignupInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');

class FarmerController {
    static homePage(req,res){
        res.render('farmerHome',{ 
            error: req.query.error, 
            user: req.session.user,
         });
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
