const User = require('../models/User.model');

module.exports.userProfile = (req, res, next) => {
    res.render('user/profile', { user: req.user });
}

module.exports.userProfileEducation = (req, res, next) => {
    res.render('user/education', { user: req.user });
}

module.exports.userProfileExperience = (req, res, next) => {
    res.render('user/experience', { user: req.user });
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications', { user: req.user });
}