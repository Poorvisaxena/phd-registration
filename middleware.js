module.exports.isLoggedIn = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
}
module.exports.isAdmin = (req, res, next) => {
    console.log(res.locals.currentUser);
    next();
}