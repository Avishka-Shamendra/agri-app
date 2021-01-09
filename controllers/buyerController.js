const { LogInInfo } = require('./validators/authInfo');

class BuyerController {
    static signupPage(req,res){
        res.render('buyerSignUp',{ error: req.query.error, user: req.session.user });
    }

    
}

module.exports = BuyerController;
