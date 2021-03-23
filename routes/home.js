const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const Applicant = require('../models/applicant');
const { isLoggedIn, hasPermission } = require('../middleware');
router.get('/', (req, res) => {
    res.render('templates/home');
})
router.get('/register', (req, res) => {
    res.render('templates/registerForm', { originalPath: req.originalUrl });
})
router.get('/login', (req, res) => {
    res.render('templates/loginForm');
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/register');
        }
        const { role } = res.locals;
        const user = new User({ username, userType: role.General });
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
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
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
        const redirectUrl = req.session.returnTo || '/';
        delete req.session.returnTO;
        res.redirect(redirectUrl);
    }
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
router.get('/phd/apply', isLoggedIn, (req, res) => {
    res.render('templates/applicationForm');
})
const populateWorkExperience = (workExperience) => {
    if (workExperience === undefined) return "No Work Experience specified"
    const { companyName, designation, duration, domain } = workExperience;
    if (typeof (companyName) === "string") {
        return [{ companyName, designation, duration, domain }];
    }
    const jobs = [];
    const n = companyName.length;
    for (let i = 0; i < n; i++) {
        const company = {
            companyName: companyName[i],
            designation: designation[i],
            duration: duration[i],
            domain: domain[i],
        };
        jobs.push(company);
    }
    return jobs;
}
router.post('/phd/apply', catchAsync(async (req, res) => {
    // console.log(req.body);
    const { scholar, guardian, graduation, postGraduation, seniorSecondary, highSchool, workExperience } = req.body;
    scholar.guardian = guardian;
    scholar.education = { highSchool, seniorSecondary, graduation, postGraduation };
    scholar.submissionOfApplication = new Date().toJSON().slice(0, 10);
    scholar.workExperience = populateWorkExperience(workExperience);
    const applicant = new Applicant(scholar);
    applicant.applicationStatus = 'On Hold';
    await applicant.save();
    // console.log(applicant);
    res.send("vohoosucessfully created");
}));
module.exports = router;