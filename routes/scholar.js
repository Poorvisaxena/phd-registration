const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const scholars = require('../controllers/scholar');

router.get('/home', isLoggedIn, scholars.renderHomePage);
module.exports = router;

//CODE THAT IS NOT REQUIRED RIGHT NOW BUT WE MAY NEED IT LATER ON
// const catchAsync = require('../utils/catchAsync');
// const passport = require('passport');
// const User = require('../models/user');
// const Applicant = require('../models/applicant');
// const Department = require('../models/department');