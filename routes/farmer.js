const router = require('express').Router();

const FarmerController = require('../controllers/farmerController');
const PostController = require('../controllers/postController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifFarmer =require('../middleware/ifFarmer');
const uploadFileMiddleware = require('../middleware/upload');

//GET Reqs
router.get('/',ifLoggedIn, ifFarmer, FarmerController.homePage);
router.get('/signup', ifNotLoggedIn, FarmerController.signupPage);
router.get('/addPost',ifLoggedIn,ifFarmer,PostController.addPostPage);
router.post('/addPost',ifLoggedIn,ifFarmer,uploadFileMiddleware,PostController.addPost);


//POST Reqs
router.post('/signup', ifNotLoggedIn, FarmerController.signup);

module.exports=router;