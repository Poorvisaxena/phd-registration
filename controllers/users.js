const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('templates/registerForm', { originalPath: req.originalUrl });
}

module.exports.renderLogin = (req, res) => {
    res.render('templates/loginForm');
}

module.exports.register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/register');
        }
        const { role } = res.locals;
        const user = new User({ username, userType: role.General, applicationStatus: 'notSubmitted' });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Registration Successfull');
            res.redirect('/');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.login = (req, res) => {
    const currentUser = req.user;
    const { role } = res.locals;
    req.flash('success', 'welcome back!');
    if (currentUser.userType === role.Admin) {
        res.redirect('/admin');
    } else if (currentUser.userType === role.Vc) {
        //do something
    } else if (currentUser.userType === role.Supervisor) {
        //do something
    } else if (currentUser.userType === role.Evaluator) {
        // do something
    } else if (currentUser.userType === role.Hod) {
        // do something
    } else {
        const redirectUrl = req.session.returnTo || '/home';
        delete req.session.returnTO;
        res.redirect(redirectUrl);
    }
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}