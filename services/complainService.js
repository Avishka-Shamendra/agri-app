const Errors = require('../helpers/error');
const Complains = require('../models/Complains');
const dateFormat = require('../helpers/dateFormat');

class ComplainServices{
    static async addComplain({
        reasons},complainer_id, complainee_id){
        const isComplained=await Complains.isAlreadyComplained(complainer_id,complainee_id);
        if(isComplained){
            throw new Errors.Unauthorized("You have already reported the user");
        }
        const date_obj = dateFormat.changeTimezoneToLk(new Date());
        const added_day = dateFormat.ymd(date_obj);
        
        return Complains.addComplain(complainer_id,complainee_id,reasons,added_day);
        }

        static async getAllComplains(){
            return Complains.getAllComplains();
        }

        static async delete(com_id){
            return Complains.delete(com_id);
        }
    }

    

    
module.exports=ComplainServices