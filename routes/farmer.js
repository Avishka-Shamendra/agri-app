const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifFarmer =require('../middleware/ifFarmer');

//GET Reqs
router.get('/',ifLoggedIn, ifFarmer, FarmerController.homePage);
router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);



//POST Reqs
router.post('/signup', ifNotLoggedIn, FarmerController.signup);

module.exports=router;