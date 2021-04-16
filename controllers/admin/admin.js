const User = require('../../models/user');

module.exports.renderHomePage = (req, res) => {
    res.render('templates/admin/home');
}

module.exports.renderRegister = (req, res) => {
    res.render('templates/registerForm', { originalPath: req.originalUrl });
}

module.exports.register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/register');
        }
        const { role } = res.locals;
        const user = new User({ username, userType: role.Admin });
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