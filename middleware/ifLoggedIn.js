const ifLoggedIn = (req, res, next) => {
    if (req.session.user) {
        if(req.session.user.banned){
            req.session.user={};
        }
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = ifLoggedIn;
