const ifAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.type === 'admin') { // if admin
            next();
        }
    } else {
        res.redirect('/');
    }
};

module.exports = ifAdmin;
