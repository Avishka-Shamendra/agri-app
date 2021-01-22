const Errors = require('../helpers/error');
const { getAllComplains } = require('../models/Complains');
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

        static async getAllComplains(){
            return Complains.getAllComplains();
        }

        static async delete(com_id){
            return Complains.delete(com_id);
        }
    }

    

    
module.exports=ComplainServices