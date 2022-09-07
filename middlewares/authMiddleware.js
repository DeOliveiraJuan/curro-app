module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    console.log('>>> isNotAuthenticated if next');
    next();
  } else {
    console.log('>>> isNotAuthenticated else redirect /profile');
    res.redirect("/profile");
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('>>> isAuthenticated if next');
    next();
  } else {
    console.log('>>> isAuthenticated else redirect /login');
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
  if (req.session.currentUser.isCompany) {
    res.redirect("/company/offers");
  } else {
    next();

  }
};