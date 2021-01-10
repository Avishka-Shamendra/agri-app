const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifFarmer = require('../middleware/ifFarmer');

router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);
router.get('/addpost',ifLoggedIn,ifFarmer,FarmerController.addPostPage);

module.exports=router;