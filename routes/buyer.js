const router = require('express').Router();
const BuyerController = require('../controllers/buyerController');
const PostController=require('../controllers/postController');
const MessageController=require('../controllers/messageController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifBuyer = require('../middleware/ifBuyer');


//get
router.get('/signup', ifNotLoggedIn, BuyerController.signupPage);
router.get('/',ifLoggedIn,ifBuyer, BuyerController.homePage);
router.get('/viewpost/:postid', ifLoggedIn, ifBuyer, PostController.viewPost);


//post
router.post('/filter',ifLoggedIn,ifBuyer, BuyerController.filterPosts);
router.post('/signup', ifNotLoggedIn, BuyerController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifBuyer, BuyerController.editProfile );
router.post('/message/buyerRequest/:postid', ifLoggedIn,ifBuyer, MessageController.buyerRequest)
module.exports=router;