const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else if (req.session.user.type === "admin") { // if admin
        res.redirect('/admin');
    } else if (req.session.user.type === "buyer") { // if buyer
        res.redirect('/buyer');
    } else if (req.session.user.type === "farmer") { // if admin
        res.redirect('/farmer');
    }
};

module.exports = ifNotLoggedIn;
