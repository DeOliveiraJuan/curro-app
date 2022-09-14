const router = require('express').Router();
const passport = require('passport');

const miscController = require('../controllers/misc.controller');
const offerController = require('../controllers/offer.controller');
const companiesController = require('../controllers/companyProfile.controller');
const usersController = require('../controllers/userProfile.controller');
const educationController = require('../controllers/education.controller');
const experienceController = require('../controllers/experience.controller');
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
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES }));
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle);
router.get('/logout', authMiddlewares.isAuthenticated, authController.logout);

//User routes
router.get('/user/profile', authMiddlewares.isAuthenticated, usersController.userComplete);
router.post('/user/profile', authMiddlewares.isAuthenticated, usersController.doRegisterComplete);

//User education routes
router.get('/user/education', authMiddlewares.isAuthenticated, educationController.educationProfile);
router.post('/user/education', authMiddlewares.isAuthenticated, educationController.doRegister);
router.get('/user/education/create', authMiddlewares.isAuthenticated, educationController.register);
router.delete('/user/education/:id', authMiddlewares.isAuthenticated, educationController.delete);

// User experience routes
router.get('/user/experience', authMiddlewares.isAuthenticated, experienceController.experienceProfile);
router.post('/user/experience', authMiddlewares.isAuthenticated, experienceController.doRegister);
router.get('/user/experience/create', authMiddlewares.isAuthenticated, experienceController.register);
router.delete('/user/experience/:id', authMiddlewares.isAuthenticated, experienceController.delete);

router.get('/profile/:id', authMiddlewares.isAuthenticated, usersController.publicProfile);
//Offer routes
router.get('/offer/feed', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.feed);
router.get('/offer/detail/:id', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.detail);
router.delete('/company/offer/:id', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, offerController.delete);

//Company routes
router.get('/company/register', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.register);
router.post('/company/register', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, fileUpload.single("image"), companiesController.doRegister);

router.get('/company/offers', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.offers);
router.get('/company/list', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.list);
router.get('/company/offer/create', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.create);
router.post('/company/offer/create', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.doCreate);
router.get('/company/:id', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.viewCompany);
router.get('/company/offer/:id', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.viewCompany);

router.get('/company/offer/detail/:id', authMiddlewares.isAuthenticated, authMiddlewares.isCompany, companiesController.viewOffer);

//Favorite Routes
router.post('/offer/favorite', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.favorite);
router.post('/offer/apply', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.apply);
router.post('/offer/deny', authMiddlewares.isAuthenticated, authMiddlewares.isNotCompany, offerController.deleteApply);

module.exports = router

