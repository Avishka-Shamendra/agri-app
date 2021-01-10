const { LogInInfo } = require('./validators/authInfo');
const Errors = require('../helpers/error');
const UserService = require('../services/userServices');

class RootController {
    static indexPage(req,res){
        res.render('index',{ error: req.query.error, user: req.session.user });
    }
    static loginPage(req, res) {
        res.render('login', { error: req.query.error,
             user: req.session.user,
             email:req.query.email,
            adminRegSuccess:req.query.adminRegSuccess,
            farmerRegSuccess:req.query.farmerRegSuccess,
            buyerRegSuccess:req.query.buyerRegSuccess
         });
    }

    static async login(req, res) {
        try {
            const { value, error } = await LogInInfo.validate(req.body);
            if (error) throw (error);
            const user = await UserService.login(value);
            if(user.banned){
                throw new Errors.Unauthorized('This account is currently banned');
            }
            req.session.user = {};
            req.session.user.uid = user.uid;
            req.session.user.type = user.type;
            req.session.user.email = user.email;
            req.session.user.name = user.first_name+ " "+user.last_name; 
            req.session.user.farmerData = user.farmerData; // null if not farmer
            req.session.user.buyerData = user.buyerData; // null if not buyer
            res.redirect(`/${user.type}`);
        } catch (err) {
            //logger.error(err);
            res.redirect(`/login?error=${err}&email=${req.body.email}`);
        }
    }

    static async logout(req, res) {
        try {
            req.session.user = undefined;
            res.redirect('/');
        } catch (err) {
            //logger.error(err);
            res.redirect('/');
        }
    }
}

module.exports = RootController;
