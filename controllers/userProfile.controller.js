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

module.exports.userEducation = (req, res, next) => {
    user = req.user;
    UserEducation.find({ user: user._id })
        .then((educations) => {
            console.log('educaciones', educations);
            res.render('user/education', { educations, user });
        })
        .catch((err) => next(err))
}

module.exports.userExperience = (req, res, next) => {
    res.render('user/experience', { user: req.user });
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications', { user: req.user });
}

module.exports.publicProfile = (req, res, next) => {
    const id = req.params.id;
    res.render('user/publicProfile', { user: req.user });
}