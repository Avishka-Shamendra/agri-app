const {complainInfo} = require('./validators/complainInfo');
const ComplainServices = require('../services/complainService');

class ComplainController{
    static async farmerReport(req,res){
        try{
            const {value, error}= await complainInfo.validate(req.body)
            if(error) throw error
            await ComplainServices.addComplain(value,req.session.user.uid, req.params.farmer_id)
            res.redirect(`/buyer/farmerProfile/${req.params.farmer_id}?report_success=Successfully Reported User To Admin`);

        }
        catch(e){
            res.redirect(`/buyer/farmerProfile/${req.params.farmer_id}?error=${e}&reasons=${req.body.reasons}`);
        }

    }  
}

module.exports = ComplainController;