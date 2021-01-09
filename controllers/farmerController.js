const { LogInInfo } = require('./validators/authInfo');

class FarmerController {
    static signupPage(req,res){
        res.render('farmerSignUp',{ error: req.query.error, user: req.session.user });
    }

    
}

module.exports = FarmerController;
