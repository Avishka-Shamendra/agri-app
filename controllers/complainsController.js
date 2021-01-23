const {complainInfo} = require('./validators/complainInfo');
const ComplainServices = require('../services/complainService');
const { defaultLogger } = require('../config/logger');
const logger = defaultLogger('complains-controller');


class ComplainController{
    static async farmerReport(req,res){
        try{
            const {value, error}= await complainInfo.validate(req.body)
            if(error) throw error
            await ComplainServices.addComplain(value,req.session.user.uid, req.params.farmer_id)
            res.redirect(`/buyer/farmerProfile/${req.params.farmer_id}?report_success=Successfully Reported User To Admin`);

        }
        catch(e){
            logger.error(e);
            res.redirect(`/buyer/farmerProfile/${req.params.farmer_id}?error=${e}&reasons=${req.body.reasons}`);
        }

    }  

    static async buyerReport(req,res){
        try{
            const {value, error}= await complainInfo.validate(req.body)
            if(error) throw error
            await ComplainServices.addComplain(value,req.session.user.uid, req.params.buyer_id)
            res.redirect(`/farmer/buyerProfile/${req.params.buyer_id}?report_success=Successfully Reported User To Admin`);

        }
        catch(e){
            logger.error(e);
            res.redirect(`/farmer/buyerProfile/${req.params.buyer_id}?error=${e}&reasons=${req.body.reasons}`);
        }

    }

    static async adminComplainsPage(req,res){

        try{
            const complains=await ComplainServices.getAllComplains();
            res.render('adminComplainsPage',
            {
                user:req.session.user,
                error:req.query.error,
                success:req.query.success,
                complains:complains,
            });

        }catch(e){
            logger.error(e);
            res.redirect(`/admin?error=${e}`);
        }
    }

    static async delete(req,res){
        try{
            await ComplainServices.delete(req.params.comp_id);
            res.redirect('/admin/complains?success=Complain Deleted Successfully');
        }catch(e){
            logger.error(e);
            res.redirect(`/admin/complains?error=${e}`);
        }
    }
}

module.exports = ComplainController;