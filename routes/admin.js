const router = require('express').Router();
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const AdminController = require('../controllers/adminController');
const PostController = require('../controllers/postController');
const MessageController = require('../controllers/messageController');
const ComplainsController = require('../controllers/complainsController');

//GET Requests
router.get('/',ifLoggedIn,ifAdmin,AdminController.homePage);
router.get('/signup', ifNotLoggedIn, AdminController.signupPage);
router.get('/allFarmers',ifLoggedIn,ifAdmin,AdminController.allFarmersPage);
router.get('/allBuyers',ifLoggedIn,ifAdmin,AdminController.allBuyersPage);
router.get('/farmer/:uid',ifLoggedIn,ifAdmin,AdminController.adminSingleFarmerPage);
router.get('/buyer/:uid',ifLoggedIn,ifAdmin,AdminController.adminSingleBuyerPage);
router.get('/stats',ifLoggedIn,ifAdmin,AdminController.statsPage);
router.get('/buyerRequests',ifLoggedIn,ifAdmin,MessageController.adminMessagesPage);
router.get('/allPosts',ifLoggedIn,ifAdmin,AdminController.adminPostsPage);
router.get('/complains',ifLoggedIn,ifAdmin,ComplainsController.adminComplainsPage);
router.get('/farmer/:uid/ban',ifLoggedIn,ifAdmin,AdminController.banUser);
router.get('/buyer/:uid/ban',ifLoggedIn,ifAdmin,AdminController.banUser)
router.get('/buyer/:uid/unban',ifLoggedIn,ifAdmin,AdminController.unbanUser);
router.get('/farmer/:uid/unban',ifLoggedIn,ifAdmin,AdminController.unbanUser);
router.get('/find',ifLoggedIn,ifAdmin,AdminController.search);
router.get('/deletePost/:post_id',ifLoggedIn,ifAdmin,PostController.deletePostAdmin);
router.get('/deleteFarmerPost/:post_id',ifLoggedIn,ifAdmin,PostController.deleteFarmerPostAdmin);
router.get('/deleteRequest/:req_msg_id',ifLoggedIn,ifAdmin,MessageController.deleteMsgAdmin);
router.get('/deleteComplain/:comp_id',ifLoggedIn,ifAdmin,ComplainsController.delete);
router.get('/deleteSoldExpiredPosts',ifLoggedIn,ifAdmin,AdminController.deleteSoldExpiredPosts);


//POST Requests
router.post('/signup',ifNotLoggedIn, AdminController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifAdmin, AdminController.editProfile );
router.post('/farmer/delete/:uid',ifLoggedIn,ifAdmin,AdminController.deleteFarmer);
router.post('/buyer/delete/:uid',ifLoggedIn,ifAdmin,AdminController.deleteBuyer);
router.post('/navbarSearch',ifLoggedIn,ifAdmin,AdminController.searchUser);
router.post('/find',ifLoggedIn,ifAdmin,AdminController.search);


module.exports=router;