const UserExperience = require('../models/UserExperience.model');

module.exports.register = (req, res, next) => {
    res.render('user/experienceForm');
}

module.exports.doRegister = (req, res, next) => {
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

module.exports.experienceProfile = (req, res, next) => {
    user = req.user;
    UserExperience.find({ user: user._id })
        .then((experiences) => {
            res.render('user/experience', { experiences, user });
        })
        .catch((err) => next(err))
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    UserExperience.findByIdAndDelete(id, { status: false })
        .then(() => {
            res.send('TODO OK en experience 🧯');
        }
        )
        .catch((err) => next(err))
}