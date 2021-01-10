const ifAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.type) {
        if (req.session.user.type === 'admin') { // if admin
            next();
        }else{
            res.redirect(`/${req.session.user.type}`);
        }
    } else {
        res.redirect('/');
    }
};

module.exports = ifAdmin;
