const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');

const applicants = require('../../controllers/admin/applicant');

router.get('/', catchAsync(applicants.indexPage));

router.route('/:id')
    .get(catchAsync(applicants.showPage))
    .delete(catchAsync(applicants.rejectApplication));

router.get('/:id/accept', catchAsync(applicants.acceptApplication));

module.exports = router;

//CODE THAT WE DONT NEED RIGHT NOW.BUT WE MAY NEED IT LATER
// const ExpressError = require('../../utils/ExpressError');
// const passport = require('passport');
// const User = require('../../models/user');
// const Applicant = require('../../models/applicant');
// const User = require('../../models/user');
// const Scholar = require('../../models/scholar');