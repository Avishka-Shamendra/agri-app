const { AdminSignUpInfo } = require('./validators/authInfo');
const { AdminEditInfo } =require('./validators/editProfileInfo');
const UserService = require('../services/userServices');
const FarmerService = require('../services/farmerService');
const BuyerService = require('../services/buyerService');
const PostService = require('../services/postServices');
const AdminService = require('../services/adminService');
const Error = require('../helpers/error');

class AdminController {
    static homePage(req,res){
        res.render('adminHome',{ 
            error: req.query.error, 
            user: req.session.user,
         });
    }

    static async searchUser(req, res){
        const search_param = req.body.search;
        if(search_param.slice(0,4)){

        }
    }

    static async search(req, res){
        try{
            const pattern = /[0-9]/g;
            let res_obj;
            if (pattern.test(req.query.query)){
                const farmer_alike = await FarmerService.getFarmerByNICLike(req.query.query);
                const buyer_alike = await BuyerService.getBuyerByNICLike(req.query.query);

                res_obj ={
                    success:true,
                    type:'nic',
                    farmers:farmer_alike,
                    buyers:buyer_alike
                }

                //console.log(farmer_alike);
                //console.log(buyer_alike);
            }else {
                const user_alike = await UserService.getUserNameLike(req.query.query);
                res_obj ={
                    success:true,
                    type:'name',
                    users:user_alike
                }
                //console.log(user_alike)
            }
            res.json(res_obj);
        }catch (e) {
            //console.log(e);
            res.json({
                success:false,
                error:e
            });
        }
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

    static async editProfile(req,res){
        try{
            const { value, error } = await AdminEditInfo.validate(req.body);
            if (error) throw (error);
            const user = await UserService.adminUpdate(value,req.params.uid);
            //save edited info to session
            req.session.user.email=user.email;
            req.session.user.name = user.first_name+ " "+user.last_name; 
            req.session.user.firstName=user.first_name;
            req.session.user.lastName=user.last_name;
            req.session.user.gender=user.gender;
            req.session.user.banned =user.banned; 
            res.redirect('/editProfile?success=Changes saved sucessfully');
        }catch(err){
            //logger.error(err);
            res.redirect(`/editProfile?error=${err}`)
        }
    }

    static async allFarmersPage(req,res){
        try{
            const farmers = await FarmerService.getFarmers();

            res.render('adminFarmersPage',{
                error: req.query.error,
                success:req.query.success,
                user: req.session.user,
                farmers:farmers
            });
        }catch (e) {
            //logger.error(err);
            res.redirect(`/admin?error=${e}`)
        }
    }

    static async allBuyersPage(req,res){
        try{
            const buyers = await BuyerService.getBuyers();
            res.render('adminBuyersPage',{
                error: req.query.error,
                success:req.query.success,
                user: req.session.user,
                buyers:buyers,
            });
        }
        catch (e){
            //logger.error(err);
            res.redirect(`/admin?error=${e}`)
        }
    }

    static async adminSingleFarmerPage(req,res){
        try{
            const posts = await PostService.getPostsofFarmer(req.params.uid);
            const farmer = await FarmerService.getFarmer(req.params.uid);
            res.render('adminSingleFarmerPage',{
                error: req.query.error,
                user: req.session.user,
                ban_success:req.query.ban_success,
                unban_success:req.query.unban_success,
                posts:posts,
                farmer:farmer,
            });
        }catch (e) {
            //logger.error(err);
            res.redirect(`/admin/allFarmers?error=${e}`)
        }
    }

    static async adminSingleBuyerPage(req,res){
        try{
            const buyer = await BuyerService.getBuyer(req.params.uid);
            res.render('adminSingleBuyerPage',{
                error: req.query.error,
                user: req.session.user,
                ban_success:req.query.ban_success,
                unban_success:req.query.unban_success,
                buyer:buyer,
            });
        }catch (e) {
            //logger.error(err);
            res.redirect(`/admin/allBuyers?error=${e}`)
        }
    }

    static async banUser(req, res){
        try{
            const name = await UserService.banUser(req.params.uid);

            if(name){
                if (req.url === `/buyer/${req.params.uid}/ban`){
                    res.redirect(`/admin/buyer/${req.params.uid}?ban_success=Buyer ${name.toUpperCase()} was successfully banned`);
                }
                else if (req.url === `/farmer/${req.params.uid}/ban`){
                    res.redirect(`/admin/farmer/${req.params.uid}?ban_success=Farmer ${name.toUpperCase()}  was successfully banned`);
                }
                else{
                    throw Error.BadRequest('OOPS Ban Unsuccessful');
                }

            }

        }catch (e) {
            //logger.error(err);
            if (req.url === `/buyer/${req.params.uid}/ban`){
                res.redirect(`/admin/buyer/${req.params.uid}?error=${e}`)
            }
            else if (req.url === `/farmer/${req.params.uid}/ban`){
                res.redirect(`/admin/farmer/${req.params.uid}?error=${e}`)
            }
            else{
                res.redirect(`/admin?error=${e}`)
            }
        }
    }
    static async unbanUser(req, res){
        try{

            const name = await UserService.unbanUser(req.params.uid);

            if(name){
                if (req.url === `/buyer/${req.params.uid}/unban`){
                    res.redirect(`/admin/buyer/${req.params.uid}?unban_success=Buyer ${name} was successfully unbanned`);
                }
                else if (req.url === `/farmer/${req.params.uid}/unban`){
                    res.redirect(`/admin/farmer/${req.params.uid}?unban_success=Farmer ${name} was successfully unbanned`);
                }
                else{
                    throw Error.BadRequest('OOPS UnBan Unsuccessful');
                }
            }

        }catch (e) {
            //logger.error(err);
            if (req.url === `/buyer/${req.params.uid}/unban`){
                res.redirect(`/admin/buyer/${req.params.uid}?error=${e}`)
            }
            else if (req.url === `/farmer/${req.params.uid}/unban`){
                res.redirect(`/admin/farmer/${req.params.uid}?error=${e}`)
            }
            else{
                res.redirect(`/admin?error=${e}`)
            }
        }
    }

    static async statsPage(req, res){
        try{
            const stats_obj = await  AdminService.systemStats();
            res.render('adminStatsPage',{
                error:req.query.error,
                user:req.session.user,
                stats:stats_obj,
            });
        }catch (e) {
            res.redirect(`/admin?error=${e}`)
        }
    }

    static async deleteFarmer(req, res){
        const account_uid = req.params.uid;
        try{
            await UserService.deleteAccountAdmin(req.body,req.session.user.uid,account_uid);
            res.redirect('/admin/allFarmers?success=Farmer Deleted Successfully');
        }catch (e) {
            res.redirect(`/admin/farmer/${account_uid}?error=${e}`);
        }
    }

    static async deleteBuyer(req, res){
        const account_uid = req.params.uid;
        try{
            await UserService.deleteAccountAdmin(req.body,req.session.user.uid,account_uid);
            res.redirect('/admin/allBuyers?success=Buyer Deleted Successfully');
        }catch (e) {
            res.redirect(`/admin/buyer/${account_uid}?error=${e}`)
        }
    }

    static async adminPostsPage(req,res){
        try{
            const posts=await PostService.getAllPosts();
            res.render('adminPostsPage',
            {
                error:req.query.error,
                success:req.query.success,
                user:req.session.user,
                activePosts:posts.filter((post)=>post.status=='Active'),
                soldPosts:posts.filter((post)=>post.status=='Sold'),
                expiredPosts:posts.filter((post)=>post.status=='Expired')
            });

        }catch(e){
            res.redirect(`/admin?error=${e}`);
        }
    }

    static async deleteSoldExpiredPosts(req, res){
        try{
            await PostService.deleteSoldExpiredPosts();
            res.redirect('')

        }catch (e) {
            res.redirect(`/admin?error=${e}`);
        }
    }
}

module.exports = AdminController;
