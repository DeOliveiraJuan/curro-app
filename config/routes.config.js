const router = require('express').Router();
const passport = require('passport');

const miscController = require('../controllers/misc.controller');
const offerController = require('../controllers/offer.controller');
const companiesController = require('../controllers/companyProfile.controller');
const usersController = require('../controllers/userProfile.controller');
const authController = require('../controllers/auth.controller');
const fileUpload = require("../config/cloudinary.config")
const authMiddlewares = require('../middlewares/authMiddleware');


const SCOPES = [
  "profile",
  "email"
]

router.get('/', miscController.home);

// Auth routes
router.get('/register', authController.register);
router.post('/register', authController.doRegister);
router.get('/login', authMiddlewares.isNotAuthenticated, authController.login);
router.post('/login', authController.doLogin);
router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES }));
router.get('/auth/google/callback', authController.doLoginGoogle);
router.get('/logout', authMiddlewares.isAuthenticated, authController.logout);

//User routes
router.get('/profile', authMiddlewares.isAuthenticated, usersController.userProfile);

//Offer routes
router.get('/offer/feed', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.feed);
router.get('/offer/detail/:id', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.detail);

//Company routes
router.get('/company/register', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.register);
router.post('/company/register', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, fileUpload.single("image"), companiesController.doRegister);

router.get('/company/offers', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.offers);

//Favorite Routes
router.post('/offer/favorite', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.favorite);


module.exports = router

