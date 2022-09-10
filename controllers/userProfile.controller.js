const User = require('../models/User.model');
const UserEducation = require('../models/UserEducation.model')
const UserExperience = require('../models/UserExperience.model');


module.exports.register = (req, res, next) => {
    res.render('user/profile', { user: req.user });
}

module.exports.registerEducation = (req, res, next) => {
    res.render('user/education');
}

module.exports.doRegisterEducation = (req, res, next) => {
   const { institutionName, typeOfStudy, fieldOfStudy, startDate, endDate } = req.body;
   const user = res.locals.currentUser._id
   console.log(user)
   console.log(req.body);
   const education = new UserEducation({ institutionName, typeOfStudy, fieldOfStudy, startDate, endDate, user });
   education.save()
    .then(() => {
        res.redirect('/user/education');
    }).catch(err => {
        console.log(err)
    })
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