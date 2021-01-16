const router = require('express').Router();
const BuyerController = require('../controllers/buyerController');
const PostController=require('../controllers/postController');
const MessageController=require('../controllers/messageController');
const ComplainController = require('../controllers/complainsController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifBuyer = require('../middleware/ifBuyer');


//get
router.get('/signup', ifNotLoggedIn, BuyerController.signupPage);
router.get('/',ifLoggedIn,ifBuyer, BuyerController.homePage);
router.get('/viewpost/:postid', ifLoggedIn, ifBuyer, PostController.viewPost);
router.get('/sentRequests',ifLoggedIn,ifBuyer,BuyerController.sentRequestsPage);
router.get('/deleteMsg/:msg_id',ifLoggedIn,ifBuyer,MessageController.deleteMsg);
router.get('/viewpost/deleteMsg/:msg_id',ifLoggedIn,ifBuyer,MessageController.deleteMsgViewPost);
router.get('/farmerProfile/:farmer_id',ifLoggedIn,ifBuyer,BuyerController.farmerProfilePage);

//post
router.post('/filter',ifLoggedIn,ifBuyer, BuyerController.filterPosts);
router.post('/signup', ifNotLoggedIn, BuyerController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifBuyer, BuyerController.editProfile );
router.post('/message/buyerRequest/:postid', ifLoggedIn,ifBuyer, MessageController.buyerRequest);
router.post('/reportFarmer/:farmer_id',ifLoggedIn,ifBuyer, ComplainController.farmerReport);
module.exports=router;