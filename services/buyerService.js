const Buyer = require('../models/Buyer');
const Errors = require('../helpers/error');
const User = require('../models/User');


class BuyerService{
    static async getBuyers(limit = null){
        const buyers = await Buyer.getBuyers();
        if(!buyers){
            throw new Errors.InternalServerError(' Internal Server Error');
        }
        return buyers;
    }

    static async getBuyer(uid){
        const buyer = await Buyer.getBuyer(uid);
        if(!buyer){
            throw new Errors.BadRequest(' No Such Farmer');
        }
        return buyer;
    }
}

module.exports = BuyerService;