const router = require('express').Router();

const miscController = require('../controllers/misc.controller');
const offerController = require('../controllers/offer.controller');
const companyController = require('../controllers/companyProfile.controller');

router.get('/', miscController.home);

//Offer routes
router.get('/offer/feed', offerController.feed);
router.get('/offer/detail/:id', offerController.detail);

//Company routes
router.get('/company/register', companyController.register);
router.post('/company/register', companyController.doRegister);


module.exports = router

