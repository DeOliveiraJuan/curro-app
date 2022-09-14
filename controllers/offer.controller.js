const Offers = require('../models/CompanyOffer.model')
const Favorite = require('../models/Favorite.model')
const offerUser = require('../models/OfferUser.model')
const OfferUser = require('../models/OfferUser.model')


module.exports.feed = (req, res, next) => {
    Offers.find({ status: true }).populate('company')
        .then((offers) => {
            return offers
        }).then((offers) => {
            console.log(offers)
            res.render("offer/feed", { offers, user: req.user });
        })
        .catch((err) => next(err))
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Promise.all([
        Offers.findById(id).populate('company'),
        Favorite.find({ user: req.user._id }).populate('offer'),
        OfferUser.find({ offer: id }).populate('user')
    ])
        .then(([offer, favorites, offerUser]) => {
            let enrolled;
            if (offerUser.length > 0) {
                enrolled = offerUser.length > 0 ? offerUser[0] : null;
                enrolled.estado = enrolled.status === 'pending' ? true : undefined;
            } else {
                enrolled = null;
            }
            res.render("offer/detail", { offer, favorites, enrolled, user: req.user });
        })
        .catch((err) => next(err))
}

module.exports.favorite = (req, res, next) => {
    const { offer } = req.body;
    const user = res.locals.currentUser._id
    Favorite.find({ offer, user })
        .then((favorites) => {
            if (favorites.length > 0) {
                return Favorite.findByIdAndDelete(favorites[0]._id)
            } else {
                return Favorite.create({
                    user,
                    offer
                })
            }
            return offer;
        })
        .then((offer) => {
            res.send('Todo Ok');
        })
        .catch((err) => next(err))
}

module.exports.apply = (req, res, next) => {
    const { offer } = req.body;
    const user = res.locals.currentUser._id
    offerUser.find({ offer, user }).then((offerUser) => {
        if (offerUser.length > 0) {
            res.send('Ya estas aplicado a esta oferta');
        } else {
            OfferUser.create({
                user,
                offer
            })
        }
    })
        .then(() => {
            res.send('Todo Ok');
        })
        .catch((err) => next(err))

}


module.exports.deleteApply = (req, res, next) => {
    const { offer } = req.body;
    const user = res.locals.currentUser._id
    OfferUser.findOneAndDelete({ offer, user })
        .then(() => {
            res.send('Todo Ok');
        })
        .catch((err) => next(err))
}



module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    //findByIdAndUpdate
    Offers.findByIdAndUpdate(id, { status: false })
        .then(() => {
            res.send('Todo Ok');
        }
        )
        .catch((err) => next(err))

}


