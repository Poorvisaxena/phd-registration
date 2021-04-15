const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const Applicant = require('../models/applicant');
const Department = require('../models/department');
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
        const redirectUrl = req.session.returnTo || '/home';
        delete req.session.returnTO;
        res.redirect(redirectUrl);
    }
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
router.get('/phd/apply', isLoggedIn, catchAsync(async (req, res) => {
    const currentUser = req.user;
    if (currentUser.applicationStatus === "notSubmitted") {
        const departments = await Department.find({});
        res.render('templates/applicationForm', { departments });
    } else {
        res.render('templates/applicationForm/submitted');
    }
}));
const populateWorkExperience = (workExperience) => {
    if (workExperience === undefined || workExperience.companyName === "") return [];
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
router.post('/phd/apply', isLoggedIn, catchAsync(async (req, res) => {

    const { scholar, guardian, graduation, postGraduation, seniorSecondary, highSchool, workExperience } = req.body;
    scholar.guardian = guardian;
    scholar.education = { highSchool, seniorSecondary, graduation, postGraduation };
    scholar.submissionOfApplication = new Date().toJSON().slice(0, 10);
    scholar.workExperience = populateWorkExperience(workExperience);
    const applicant = new Applicant(scholar);
    applicant.userId = req.user._id;
    await applicant.save();
    const currentUser = await User.findById(req.user._id);
    currentUser.applicationStatus = "onHold";
    await currentUser.save();
    req.flash('success', 'Application Submitted Successfully')
    res.redirect('/home');
}));


// from here scholar routes are started.will move them to a different file later  on
router.get('/home', isLoggedIn, (req, res) => {
    const { currentUser } = res.locals;
    if (currentUser.applicationStatus === "accepted") {
        res.render('templates/scholar/home');
    } else if (currentUser.applicationStatus === "onHold") {
        res.render('templates/applicationForm/onHold');
    } else if (currentUser.applicationStatus === "rejected") {
        res.render('templates/applicationForm/rejected');
    } else {
        res.render('templates/applicationForm/notSubmitted');
    }

})

module.exports = router;