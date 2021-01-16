const Farmer = require('../models/Farmer');
const Errors = require('../helpers/error');
const User = require('../models/User');
//fd

class FarmerService{
    static async getFarmers(limit = null){
        const farmers = await Farmer.getFarmers();
        if(!farmers){
            throw new Errors.InternalServerError(' Internal Server Error');
        }
        return farmers;
    }
    static async getFarmer(uid){
        const farmer = await Farmer.getFarmer(uid);
        if(!farmer){
            throw new Errors.BadRequest(' No Such Farmer');
        }
        return farmer;
    }

    
}

module.exports = FarmerService;