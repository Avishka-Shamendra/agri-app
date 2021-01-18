const Errors = require('../helpers/error');
const Complains = require('../models/Complains');

class ComplainServices{
    static async addComplain({
        reasons},complainer_id, complainee_id){
        const isComplained=await Complains.isAlreadyComplained(complainer_id,complainee_id);
        if(isComplained){
            throw new Errors.Unauthorized("You have already reported the user");
        }
        
        return Complains.addComplain(complainer_id,complainee_id,reasons);
        }
    }

    
module.exports=ComplainServices