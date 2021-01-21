const { LogInInfo } = require('./validators/authInfo');
const Errors = require('../helpers/error');
const UserService = require('../services/userServices');
const PostService = require('../services/postServices');
const { ChangePasswordInfo } = require('./validators/editProfileInfo');

class RootController {
    static async indexPage(req,res){
        try{
            const recentPosts = await PostService.getRecentPosts();
            try{
                await PostService.updateExpired();
            }catch(e){
            }
            res.render('index',
            { error: req.query.error,
                user: req.session.user,
                posts:recentPosts,
            });
        }catch(e){
            res.render('index',
            {
                error: req.query.error,
                user: req.session.user,
                posts:null,
             }); 
        }
    }
    static loginPage(req, res) {
        res.render('login', { error: req.query.error,
             user: req.session.user,
             email:req.query.email,
            adminRegSuccess:req.query.adminRegSuccess,
            farmerRegSuccess:req.query.farmerRegSuccess,
            buyerRegSuccess:req.query.buyerRegSuccess,
            del_acc_success:req.query.del_acc_success,
         });
    }

    static editProfilePage(req,res){
        res.render('userEditProfile',{
            error:req.query.error,
            success:req.query.success,
            pwd_success:req.query.pwd_success,
            pwd_error:req.query.pwd_error,
            del_acc_error:req.query.del_acc_error,
            user:req.session.user
        });
    }

    static creditPage(req,res){
        res.render('_credits_aboutus',{
            error:req.query.error,
            user:req.session.user
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
            req.session.user.firstName = user.first_name;
            req.session.user.lastName = user.last_name;
            req.session.user.gender = user.gender;
            req.session.user.banned =user.banned; 
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

    static async changePassword(req,res){
        try{
            const { value, error } = await ChangePasswordInfo.validate(req.body);
            if (error) throw (error);
            await UserService.changePassword(value,req.params.uid);
            res.redirect(`/editProfile?pwd_success=Password Changed Successfully.#changePassword`)
        }catch(err){
            res.redirect(`/editProfile?pwd_error=${err}#changePassword`)
        }
    }

    static async deleteAccount(req,res){
        try{
            await UserService.deleteAccount(req.body,req.params.uid);
            req.session.user = undefined;
            res.redirect('/login?del_acc_success=Account Deleted Successfully');
        }catch(err){
            res.redirect(`/editProfile?del_acc_error=${err}#delAccount`)
        }
    }
}

module.exports = RootController;
