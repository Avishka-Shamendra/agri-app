const Buyer = require('../models/Buyer');
const Errors = require('../helpers/error');
const User = require('../models/User');


class BuyerService{
    static async getBuyers(limit = null){
        const buyers = await Buyer.getBuyers();
        console.log(buyers);
        return buyers;
    }
}

module.exports = BuyerService;