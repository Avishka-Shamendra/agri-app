const ifAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.type === "buyer") { // if buyer
            next();
        }
    } else {
        res.redirect('/');
    }
};

module.exports = ifAdmin;
