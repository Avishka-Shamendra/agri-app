const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

//GET Requests
router.get('/',ifLoggedIn,ifAdmin, AdminController.homePage);
router.get('/signup', ifNotLoggedIn, AdminController.signupPage);
router.get('/allFarmers',AdminController.allFarmersPage);
router.get('/allBuyers',AdminController.allBuyersPage);

//POST Requests
router.post('/signup',ifNotLoggedIn, AdminController.signup);



module.exports=router;