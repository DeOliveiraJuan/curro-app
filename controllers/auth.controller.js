const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');


module.exports.register = (req, res, next) => {
  res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {
  const user = req.body;

  const renderWithErrors = (errors) => {
    res.render('auth/register', { errors, user });
  };

  User.findOne({ email: user.email })
    .then((userFound) => {
      if (userFound) {
        renderWithErrors("El email ya está registrado");
      } else {
        return User.create(user)
          .then((userCreated) => {
            res.redirect('/profile');
          });
      }
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    });
}

const login = (req, res, next, provider) => {
  passport.authenticate(provider || 'local-auth', (err, user, validations) => {

    if (err) {
      next(err)
    } else if (!user) {
      res.status(404).render('auth/login', { error: validations.error })
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError)
        } else {
          res.redirect('/profile');
        }
      })
    }
  })(req, res, next)
}

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

module.exports.doLogin = (req, res, next) => {
  login(req, res, next);
};

module.exports.doLoginGoogle = (req, res, next) => {
  login(req, res, next, 'google-auth')
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};