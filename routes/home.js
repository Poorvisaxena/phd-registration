const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');


const home = require('../controllers/home');
const users = require('../controllers/users');

router.get('/', home.homePage);

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.get('/phd/apply', isLoggedIn, catchAsync(home.renderApplicationForm));

router.post('/phd/apply', isLoggedIn, catchAsync(home.submitApplication));

module.exports = router;

//CODE THATS NOT REQUIRED RIGHT NOW BUT WE MAY NEED IT LATER ON

// const User = require('../models/user');
// const Applicant = require('../models/applicant');
// const Department = require('../models/department')