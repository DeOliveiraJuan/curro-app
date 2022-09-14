const Company = require('../models/Company.model');
const CompanyOffer = require('../models/CompanyOffer.model')

module.exports.company = (req, res, next) => {
    res.render('company/profile', { user: req.user });
}

module.exports.register = (req, res, next) => {
    res.render('company/register', { user: req.user });
}

module.exports.doRegister = (req, res, next) => {
    const { name, legalName, nif, phoneNumber, email } = req.body;
    const image = req.file.path
    const user = res.locals.currentUser._id
    const company = new Company({ name, legalName, nif, phoneNumber, email, image, user });
    company.save()
        .then(() => {
            res.redirect('/company/list');
        }).catch((err) => next(err))
}

module.exports.offers = (req, res, next) => {
    user = req.user;
    CompanyOffer.find({ user: user._id, status: true }).populate('company')
        .then((offers) => {
            return res.render("company/offers", { offers, user });
        })
        .catch((err) => next(err))
}


module.exports.list = (req, res, next) => {
    user = req.user;
    Company.find({ user: user._id, status: true })
        .then((companies) => {
            console.log(companies)
            res.render("company/list", { companies, user: req.user });
        }).catch((err) => next(err))
}

module.exports.create = (req, res, next) => {
    user = req.user;
    Company.find({ user: user._id })
        .then((companies) => {
            if (companies.length > 0) {
                res.render('company/offer/create', {
                    user: req.user, companies
                });
            } else {
                res.redirect('/company/register');
            }
        })
        .catch((err) => next(err))
}

module.exports.doCreate = (req, res, next) => {
    const { company, salary, jobTitle, jobType, contractType, minExperience, description } = req.body;
    console.log(req.body)
    const companyOffer = new CompanyOffer({ company, salary, jobTitle, jobType, contractType, minExperience, description });
    companyOffer.save()
        .then(() => {
            res.redirect('/company/offer/' + companyOffer._id);
        }).catch((err) => next(err))
}

module.exports.viewCompany = (req, res, next) => {
    user = req.user;
    Company.findById(req.params.id).populate('companyOffers')
        .then((company) => {
            res.render('company/view', { company, user });
        }).catch((err) => next(err))
}

module.exports.viewOffer = (req, res, next) => {
    user = req.user;

    CompanyOffer.findById(req.params.id).populate('company')
        .then((offer) => {
            console.log(offer)
            res.render('company/offer/detail', { offer, user });
        }).catch((err) => next(err))
}

