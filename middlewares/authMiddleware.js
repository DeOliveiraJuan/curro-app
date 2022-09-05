module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    res.redirect("/profile");
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.isCompany = (req, res, next) => {
  if (req.session.currentUser.isCompany) {
    next();
  } else {
    res.redirect("/offer/feed");
  }
};

module.exports.isNotCompany = (req, res, next) => {
  if (!req.session.currentUser.isCompany) {
    next();
  } else {
    res.redirect("/company/offers");
  }
};