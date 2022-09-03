const User = require('../models/User.model');

module.exports.userProfile = (req, res, next) => {
    res.render('user/profile');
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications');
}