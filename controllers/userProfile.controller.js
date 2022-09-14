const Favorite = require('../models/Favorite.model');
const User = require('../models/User.model');
const UserComplete = require('../models/UserComplete.model');
const UserEducation = require('../models/UserEducation.model');
const UserExperience = require('../models/UserExperience.model');


module.exports.register = (req, res, next) => {
    res.render('user/profile', { user: req.user });
}

module.exports.publicProfile = (req, res, next) => {
    res.render('user/publicprofile', { user: req.user });
}

module.exports.doRegisterComplete = (req, res, next) => {
    const { address, city, zipCode, phoneNumber, legalId, idPhoto, workPermit, europeanNationality } = req.body;
    const user = res.locals.currentUser._id
    UserComplete.find({ user: user._id })
        .then((userFound) => {
            if (userFound.length > 0) {
                UserComplete.updateOne({ user: user._id }, { $set: req.body })
                    .then((result) => {
                        console.log(result)
                    })
                    .catch(err => next(err))
            } else {
                const userComplete = new UserComplete({ address, city, zipCode, phoneNumber, legalId, idPhoto, workPermit, europeanNationality, user });
                userComplete.save()
            }
        })
        .then(() => {
            res.redirect('/user/profile');
        }).catch(err => {
            console.log(err)
        })
}

module.exports.userComplete = (req, res, next) => {
    user = req.user;
    UserComplete.find({ user: user._id })
        .then((userComplete) => {
            res.render('user/profile', { userComplete: userComplete[0], user });
        })
        .catch((err) => next(err))
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications', { user: req.user });
}

module.exports.publicProfile = (req, res, next) => {
    const id = req.params.id;
    // PromiseAll
    Promise.all([
        User.findById(id),
        UserEducation.find({ user: id }),
        UserExperience.find({ user: id }),
        UserComplete.find({ user: id })
    ])
        .then(([user, educations, experiences, userComplete]) => {
            console.log('educaciones', educations);
            res.render('user/publicProfile', { user, educations, experiences, userComplete: userComplete[0] });
        })
}

module.exports.favorites = (req, res, next) => {
    Favorite.find({ user: req.user._id })
        .populate('offer')
        .then((favorites) => {
            console.log(favorites)
            res.render('user/offerFavorites', { favorites, user: req.user });
        })
}