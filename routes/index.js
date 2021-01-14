const express = require('express');

const router = express.Router();
const RootController = require('../controllers/rootController');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

router.get('/', ifNotLoggedIn, RootController.indexPage);

router.get('/login',ifNotLoggedIn, RootController.loginPage);
router.post('/login', ifNotLoggedIn, RootController.login);

router.get('/logout', ifLoggedIn, RootController.logout);

router.use('/admin', require('./admin'));
router.use('/buyer', require('./buyer'));
router.use('/farmer', require('./farmer'));

module.exports = router;
