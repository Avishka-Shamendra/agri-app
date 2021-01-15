const { AdminSignUpInfo } = require('./validators/authInfo');
const UserService = require('../services/userServices');
const buyerService = require('../services/buyerService');
const farmerService = require('../services/farmerService');
const postService = require('../services/postServices');

class AdminController {
    static homePage(req,res){
        res.render('adminHome',{ 
            error: req.query.error, 
            user: req.session.user,
         });
    } 
    static signupPage(req,res){
        res.render('adminSignUp',{ 
            error: req.query.error, 
            user: req.session.user,
            email: req.query.email,
            firstName: req.query.firstName,
            lastName:req.query.lastName,
            gender:req.query.gender,
            securityKey:req.query.securityKey
         });
    }   
    
    static async signup(req, res) {
        try {
            const { value, error } = await AdminSignUpInfo.validate(req.body);
            if (error) throw (error);
            await UserService.adminRegister(value);
            res.redirect('/login?adminRegSuccess=You are now registered as an system admin. You can now login using your email and password');
        } catch (err) {
            //logger.error(err);
            res.redirect(`/admin/signup?error=${err}&email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&gender=${req.body.gender}&securityKey=${req.body.securityKey}`);
        }
    }

    static async allFarmersPage(req,res){
        try{
            const farmers = await farmerService.getFarmers();
            //console.log(farmers.count);

            res.render('adminFarmerPage',{
                error: req.query.error,
                user: req.session.user,
                farmers:farmers
            });
        }catch (e) {
            res.redirect(`/admin?error=${e}`)
        }
    }

    static async allBuyersPage(req,res){
        try{
            const buyers = await buyerService.getBuyers();
            //console.log(buyers.count);

            res.render('adminBuyerPage',{
                error: req.query.error,
                user: req.session.user,
                buyers:buyers
            });
        }
        catch (e){
            res.redirect(`/admin?error=${e}`)
        }
    }

    static async allPostsofFarmer(req,res){
        try{
            //console.log(req.params.uid);
            const posts = await postService.getPostofFarmer(req.params.uid);
            res.render('adminFarmerPostsPage',{
                error: req.query.error,
                user: req.session.user,
                posts:posts.posts,
                farmer_name:posts.farmer_name,
                farmer_uid:posts.uid,
                banned:posts.banned
            });
        }catch (e) {
            res.redirect(`/admin/allFarmers?error=${e}`)
        }
    }

    static async banUser(req, res){
        try{
            const name = await UserService.banUser(req.params.uid);

            if(name){
                if (req.url === `/buyer/${req.params.uid}/ban`){
                    res.redirect(`/admin/allBuyers?ban_success=Buyer ${name} was successfully banned`);
                }
                else if (req.url === `/farmer/${req.params.uid}/ban`){
                    res.redirect(`/admin/allFarmers?ban_success=Farmer ${name} was successfully banned`);
                }
                else{
                    res.redirect(`/admin/allFarmers?ban_success=Farmer ${name} was successfully banned`);
                }

            }

        }catch (e) {

            if (req.url === `/buyer/${req.params.uid}/ban`){
                res.redirect(`/admin/allBuyers?error=${e}`)
            }
            else if (req.url === `/farmer/${req.params.uid}/ban`){
                res.redirect(`/admin/allFarmers?error=${e}`)
            }
            else{
                res.redirect(`/admin/allFarmers?error=${e}`)
            }
        }
    }

    static async unbanUser(req, res){
        try{
            console.log(req.url);

            const name = await UserService.unbanUser(req.params.uid);

            if(name){
                if (req.url === `/buyer/${req.params.uid}/unban`){
                    res.redirect(`/admin/allBuyers?unban_success=Buyer ${name} was successfully unbanned`);
                }
                else if (req.url === `/farmer/${req.params.uid}/unban`){
                    res.redirect(`/admin/allFarmers?unban_success=Farmer ${name} was successfully unbanned`);
                }
                else{
                    res.redirect(`/admin/allFarmers?unban_success=Farmer ${name} was successfully unbanned`);
                }
                console.log('error in loop')
            }
            console.log('no error')

        }catch (e) {
            console.log(e)
            if (req.url === `/buyer/${req.params.uid}/unban`){
                res.redirect(`/admin/allBuyers?error=${e}`)
            }
            else if (req.url === `/farmer/${req.params.uid}/unban`){
                res.redirect(`/admin/allFarmers?error=${e}`)
            }
            else{
                res.redirect(`/admin/allFarmers?error=${e}`)
            }
        }
    }

}

module.exports = AdminController;
