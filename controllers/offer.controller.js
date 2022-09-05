const Offers = require('../models/CompanyOffer.model')
const Favorite = require('../models/Favorite.model')

module.exports.feed = (req, res, next) => {
    Offers.find().populate('company')
        .then((offers) => {
            console.log(offers)
            res.render("offer/feed", { offers, user: req.user });
        })
        .catch((err) => next(err))
}

module.exports.detail = (req, res, next) => {
    Offers.findById(req.params.id).populate('company')
        .then((offer) => {
            res.render("offer/detail", { offer, user: req.user });
        })
        .catch((err) => next(err))
}

module.exports.favorite = (req, res, next) => {
    const { offer } = req.body;
    const user = '631344f005ccfbc9bc5f48ea';
    Offers.findById(offer)
        .then((offer) => {
            Favorite.create({
                user,
                offer
            })
        })
        .then((offer) => {
            res.send('Todo Ok');
        }
        )
        .catch((err) => next(err))

}