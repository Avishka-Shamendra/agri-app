const express = require('express');

const router = express.Router();
const RootController = require('../controllers/rootController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

//GET
router.get('/', ifNotLoggedIn, RootController.indexPage);
router.get('/login',ifNotLoggedIn, RootController.loginPage);
router.get('/logout', ifLoggedIn, RootController.logout);
router.get('/editProfile',ifLoggedIn, RootController.editProfilePage);


//POST
router.post('/login', ifNotLoggedIn, RootController.login);
router.post('/changePassword/:uid', ifLoggedIn, RootController.changePassword);
router.post('/deleteAccount/:uid',ifLoggedIn,RootController.deleteAccount);


//USE
router.use('/admin', require('./admin'));
router.use('/buyer', require('./buyer'));
router.use('/farmer', require('./farmer'));

module.exports = router;
