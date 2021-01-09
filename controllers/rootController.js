const { LogInInfo } = require('./validators/authInfo');

class RootController {
    static indexPage(req,res){
        res.render('index',{ error: req.query.error, user: req.session.user });
    }
    static loginPage(req, res) {
        res.render('login', { error: req.query.error, user: req.session.user });
    }

    static async login(req, res) {
        try {
            const { value, error } = await LogInInfo.validate(req.body);
            if (error) throw (error);
            const user = await UserService.login(value);
            req.session.user = {};
            req.session.user.email = user.email;
            req.session.user.name = user.firstname+user.lastname;
            req.session.user.type = user.type;
            if (user.type === 'admin') {
                res.redirect('/admin');
            } else if (user.tpe === 'buyer') {
                res.redirect('/buyer');
            } else if (user.type === 'farmer') {
                res.redirect('/farmer');
            }
        } catch (err) {
            res.redirect(`/?error=${err}`);
        }
        
    }

    static async logout(req, res) {
       
    }
}

module.exports = RootController;
