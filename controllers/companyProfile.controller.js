const Company = require('../models/Company.model');
const CompanyOffer = require('../models/CompanyOffer.model')

module.exports.company = (req, res, next) => {
    res.render('company/profile');
}

module.exports.offers = (req, res, next) => {
    res.render('company/offers');
}

module.exports.register = (req, res, next) => {
    res.render('company/register');
}

module.exports.doRegister = (req, res, next) => {
    const { name, legalName, nif, phoneNumber, email, password } = req.body;

    console.log(req.body)
    const company = new Company({ name, legalName, nif, phoneNumber, email, password });
    company.save()
        .then(() => {
            res.redirect('/company/register');
        }).catch(err => {
            console.log(err);
        }
        );
}