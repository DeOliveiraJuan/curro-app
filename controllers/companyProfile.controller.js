const Company = require('../models/Company.model');
const CompanyOffer = require('../models/CompanyOffer.model')

module.exports.company = (req, res, next) => {
    res.render('company/profile');
}

module.exports.offers = (req, res, next) => {
    res.render('company/offers');
}