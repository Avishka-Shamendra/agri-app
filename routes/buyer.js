const router = require('express').Router();

const BuyerController = require('../controllers/buyerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

router.get('/signup', ifNotLoggedIn, BuyerController.signupPage);

module.exports=router;