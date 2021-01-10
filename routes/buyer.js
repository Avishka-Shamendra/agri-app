const router = require('express').Router();
const BuyerController = require('../controllers/buyerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifBuyer = require('../middleware/ifBuyer');

//get
router.get('/signup', ifNotLoggedIn, BuyerController.signupPage);
router.get('/',ifLoggedIn,ifBuyer, BuyerController.homePage);

//post
router.post('/signup', ifNotLoggedIn, BuyerController.signup);

module.exports=router;