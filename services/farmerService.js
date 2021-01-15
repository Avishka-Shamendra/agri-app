const Farmer = require('../models/Farmer');
const Errors = require('../helpers/error');
const User = require('../models/User');


class FarmerService{
    static async getFarmers(limit = null){
        const farmers = await Farmer.getFarmers();
        if(!farmers){
            throw new Errors.BadRequest(' Internal Server Error');
        }
        //console.log(farmers);
        return farmers;
    }
}

module.exports = FarmerService;