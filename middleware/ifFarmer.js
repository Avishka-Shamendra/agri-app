const ifAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.type === 'farmer') { // if farmer
            next();
        }
    } else {
        res.redirect('/');
    }
};

module.exports = ifAdmin;
