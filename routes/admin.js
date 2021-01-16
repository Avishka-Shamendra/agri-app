const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

//GET Requests
router.get('/',ifLoggedIn,ifAdmin,AdminController.homePage);
router.get('/signup', ifNotLoggedIn, AdminController.signupPage);
router.get('/allFarmers',ifLoggedIn,ifAdmin,AdminController.allFarmersPage);
router.get('/allBuyers',ifLoggedIn,ifAdmin,AdminController.allBuyersPage);
router.get('/farmer/:uid',ifLoggedIn,ifAdmin,AdminController.adminSingleFarmerPage);
router.get('/buyer/:uid',ifLoggedIn,ifAdmin,AdminController.adminSingleBuyerPage);
router.get('/farmer/:uid/ban',ifLoggedIn,ifAdmin,AdminController.banUser);
router.get('/buyer/:uid/ban',ifLoggedIn,ifAdmin,AdminController.banUser)
router.get('/buyer/:uid/unban',ifLoggedIn,ifAdmin,AdminController.unbanUser);
router.get('/farmer/:uid/unban',ifLoggedIn,ifAdmin,AdminController.unbanUser);
router.get('/stats',ifLoggedIn,ifAdmin,AdminController.statsPage);
router.get('/')

//POST Requests
router.post('/signup',ifNotLoggedIn, AdminController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifAdmin, AdminController.editProfile );
router.post('/farmer/:uid/delete',ifLoggedIn,ifAdmin,AdminController.deleteFarmer);
router.post('/buyer/:uid/delete',ifLoggedIn,ifAdmin,AdminController.deleteBuyer);
router.post('/navbarSearch',ifLoggedIn,ifAdmin,AdminController.searchUser);
router.post('/find',ifLoggedIn,ifAdmin,AdminController.search);


module.exports=router;