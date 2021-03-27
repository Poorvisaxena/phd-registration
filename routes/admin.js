const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport');
const User = require('../models/user');
const Applicant = require('../models/applicant');

// router.use((req, res, next) => {
//     const { currentUser, role } = res.locals;
//     if (currentUser && currentUser.userType === role.Admin)
//         return next();
//     return next(new ExpressError('Forbidden', 403));
// })
router.get('/', (req, res) => {
    res.render('templates/admin/home');
})
router.get('/register', (req, res) => {
    res.render('templates/registerForm', { originalPath: req.originalUrl });
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/register');
        }
        const { role } = res.locals;
        const user = new User({ username, userType: role.Admin });
        // console.log(user);
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
}));
router.get('/applicants', catchAsync(async (req, res) => {
    const applicants = await Applicant.find({});
    res.render('templates/admin/applicants/index', { applicants });
}))
router.get('/applicants/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    res.render('templates/admin/applicants/show', { applicant });
}))
router.get('/scholars', (req, res) => {

})
module.exports = router;