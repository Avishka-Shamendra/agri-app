const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const PostController = require('../controllers/postController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifFarmer =require('../middleware/ifFarmer');

//GET Reqs
router.get('/',ifLoggedIn, ifFarmer, FarmerController.homePage);
router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);
router.get('/addPost',ifLoggedIn,ifFarmer,PostController.addPostPage);
router.get('/myPosts/:uid',ifLoggedIn,ifFarmer,FarmerController.myPostsPage);
// router.get('/post/:post_id',ifLoggedIn,ifFarmer,PostController.farmerPostPage);


//POST Reqs
router.post('/signup', ifNotLoggedIn, FarmerController.signup);
router.post('/editProfile/:uid',ifLoggedIn,ifFarmer, FarmerController.editProfile );
router.post('/addPost',ifLoggedIn,ifFarmer,PostController.addPost);

module.exports=router;