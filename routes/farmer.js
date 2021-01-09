const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);

module.exports=router;