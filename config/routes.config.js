const router = require('express').Router();
const passport = require('passport');

const miscController = require('../controllers/misc.controller');
const offerController = require('../controllers/offer.controller');
const companiesController = require('../controllers/companyProfile.controller');
const usersController = require('../controllers/userProfile.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const SCOPES = [
  "profile",
  "email"
]

router.get('/', miscController.home);

// Auth routes
router.get('/register', authController.register);
router.post('/register', authController.doRegister);
router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authController.doLogin);
router.get('/login/google', passport.authenticate('gogle-auth', { scope: SCOPES }));
router.get('/auth/google/callback', authController.doLoginGoogle);
router.get('/logout', authController.logout);

//User routes
//router.get('/profile', authMiddleware.isAuthenticated, usersController.logout);

//Offer routes
router.get('/offer/feed', offerController.feed);
router.get('/offer/detail/:id', offerController.detail);

//Company routes
router.get('/company/register', companiesController.register);
router.post('/company/register', companiesController.doRegister);


module.exports = router

