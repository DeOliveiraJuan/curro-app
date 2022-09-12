const User = require('../models/User.model');
const UserEducation = require('../models/UserEducation.model');
const UserExperience = require('../models/UserExperience.model');
const UserComplete = require('../models/UserComplete.model');

module.exports.register = (req, res, next) => {
    res.render('user/profile', { user: req.user });
}

module.exports.doRegisterComplete = (req, res, next) => {
    const { address, city, zipCode, phoneNumber, legalId, idPhoto, workPermit, europeanNationality } = req.body;
    const user = res.locals.currentUser._id
    console.log(req.body);
    UserComplete.find({ user: user._id })
        .then((userFound) => {
            if(userFound.length > 0){
                UserComplete.updateOne({ user: user._id },  {$set: req.body})
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
            console.log('aqui', userComplete)
            res.render('user/profile', { userComplete: userComplete[0], user });
        })
        .catch((err) => next(err))
}

module.exports.registerEducation = (req, res, next) => {
    res.render('user/education');
}

module.exports.doRegisterEducation = (req, res, next) => {
   const { institutionName, typeOfStudy, fieldOfStudy, startDate, endDate } = req.body;
   const user = res.locals.currentUser._id
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
    const experience = new UserExperience({ companyName, jobTitle, startDate, endDate, description, user });
    experience.save()
    .then(() => {
        res.redirect('/user/experience');
    }).catch(err => {
        console.log(err)
    })
}

module.exports.userExperience = (req, res, next) => {
    user = req.user;
    UserExperience.find({ user: user._id })
        .then((experiences) => {
            res.render('user/experience', { experiences, user });
        })
        .catch((err) => next(err))
}

module.exports.aplications = (req, res, next) => {
    res.render('user/aplications', { user: req.user });
}