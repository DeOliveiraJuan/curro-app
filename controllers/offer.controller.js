const Offers = require('../models/CompanyOffer.model')

module.exports.feed = (req, res, next) => {
    Offers.find().populate('company')
        .then((offers) => {
            console.log(offers)
            res.render("offer/feed", { offers });
        })
        .catch((err) => next(err))
}

module.exports.detail = (req, res, next) => {
    res.render('offer/detail')
}

