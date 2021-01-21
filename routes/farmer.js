const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const PostController = require('../controllers/postController');
const MessageController = require('../controllers/messageController');
const ComplainController = require('../controllers/complainsController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifFarmer =require('../middleware/ifFarmer');

//GET Reqs
router.get('/',ifLoggedIn, ifFarmer, FarmerController.homePage);
router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);
router.get('/addPost',ifLoggedIn,ifFarmer,PostController.addPostPage);
router.get('/myPosts',ifLoggedIn,ifFarmer,FarmerController.myPostsPage);
router.get('/post/:post_id',ifLoggedIn,ifFarmer,PostController.farmerPostPage);
router.get('/markPostSold/:post_id',ifLoggedIn,ifFarmer,PostController.markAsSold);
router.get('/deletePost/:post_id',ifLoggedIn,ifFarmer,PostController.deletePostFarmer);
router.get('/markReqInterested/:post_id/:req_id',ifLoggedIn,ifFarmer,MessageController.markAsInterested);
router.get('/markReqNotInterested/:post_id/:req_id',ifLoggedIn,ifFarmer,MessageController.markAsNotInterested);
router.get('/buyerProfile/:buyer_id',ifLoggedIn,ifFarmer,FarmerController.buyerProfilePage);

//POST Reqs
router.post('/signup', ifNotLoggedIn, FarmerController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifFarmer, FarmerController.editProfile );
router.post('/addPost',ifLoggedIn,ifFarmer,PostController.addPost);
router.post('/reportBuyer/:buyer_id',ifLoggedIn,ifFarmer, ComplainController.buyerReport);

module.exports=router;