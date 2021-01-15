const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

//GET Requests
router.get('/', AdminController.homePage);
router.get('/signup', ifNotLoggedIn, AdminController.signupPage);
router.get('/allFarmers',AdminController.allFarmersPage);
router.get('/allBuyers',AdminController.allBuyersPage);
router.get('/farmer/:uid',AdminController.allPostsofFarmer);
router.get('/farmer/:uid/ban',AdminController.banUser);
router.get('/buyer/:uid/ban',AdminController.banUser)
router.get('/buyer/:uid/unban',AdminController.unbanUser)
router.get('/farmer/:uid/unban',AdminController.unbanUser)

//POST Requests
router.post('/signup',ifNotLoggedIn, AdminController.signup);



module.exports=router;