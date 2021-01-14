const Farmer = require('../models/Farmer');
const Errors = require('../helpers/error');
const User = require('../models/User');


class FarmerService{
    static async getFarmers(limit = null){
        const farmers = await Farmer.getFarmers();
        console.log(farmers);
        return farmers;
    }
}

module.exports = FarmerService;