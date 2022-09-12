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

module.exports.doRegisterExperience = (req, res, next) => {
    const { companyName, jobTitle, startDate, endDate, description } = req.body;
    const user = res.locals.currentUser._id
    console.log(user);
    console.log(req.body);
    const experience = new UserExperience({ companyName, jobTitle, startDate, endDate, description, user });
    experience.save()
    .then(() => {
        res.render('user/experience');
    }).catch(err => {
        console.log(err)
    })
}

module.exports.userExperience = (req, res, next) => {
    user = req.user;
    UserExperience.find({ user: user._id })
        .then((experiences) => {
            console.log('experiencia', experiences);
            res.render('user/experience', { experiences, user });
        })
        .catch((err) => next(err))
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications', { user: req.user });
}