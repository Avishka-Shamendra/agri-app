const { LogInInfo } = require('./validators/authInfo');
const { addpostInfo } = require('./validators/postinfo');

class FarmerController {
    static signupPage(req,res){
        res.render('farmerSignUp',{ error: req.query.error, user: req.session.user });
    }

    static addPostPage(req,res){
        res.render('addPost',{
            error: req.query.error,
            user: req.session.user
        })
    }

    
}

module.exports = FarmerController;
