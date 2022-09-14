const UserEducation = require('../models/UserEducation.model');

module.exports.register = (req, res, next) => {
    res.render('user/educationForm');
}

module.exports.doRegister = (req, res, next) => {
   const { institutionName, typeOfStudy, fieldOfStudy, startDate, endDate } = req.body;
   const user = res.locals.currentUser._id
   const education = new UserEducation({ institutionName, typeOfStudy, fieldOfStudy, startDate, endDate, user });
   education.save()
    .then(() => {
        res.redirect('/user/education');
    }).catch(err => {
    })
}

module.exports.educationProfile = (req, res, next) => {
    user = req.user;
    UserEducation.find({ user: user._id })
        .then((educations) => {
            res.render('user/education', { educations, user });
        })
        .catch((err) => next(err))
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    UserEducation.findByIdAndDelete(id, { status: false })
        .then(() => {
            res.send('TODO OK 🧯');
        }
        )
        .catch((err) => next(err))
}