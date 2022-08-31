module.exports.user = (req, res, next) => {
    res.render('company/profile');
}

module.exports.offers = (req, res, next) => {
    res.render('company/offers');
}

module.exports.register = (req, res, next) => {
    res.render('company/register');
}