const router = require('express').Router();
const BuyerController = require('../controllers/buyerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifBuyer = require('../middleware/ifBuyer');

//get
router.get('/signup', ifNotLoggedIn, BuyerController.signupPage);
router.get('/',ifLoggedIn,ifBuyer, BuyerController.homePage);

//post
router.post('/filter',ifLoggedIn,ifBuyer, BuyerController.filterPosts);
router.post('/signup', ifNotLoggedIn, BuyerController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifBuyer, BuyerController.editProfile );

module.exports=router;