const express = require('express');
const router = express.Router();

const catchAsync = require('../../utils/catchAsync');

const applicantRoutes = require('./applicants');
const scholarRoutes = require('./scholar');
const departmentRoutes = require('./department');
const supervisorRoutes = require('./supervisor');
const admin = require('../../controllers/admin/admin');

//this block here is used for authorization.
//currently commented so that we dont have to login again and again

/* router.use((req, res, next) => {
     const { currentUser, role } = res.locals;
     if (currentUser && currentUser.userType === role.Admin)
         return next();
     return next(new ExpressError('Forbidden', 403));
})*/

router.get('/', admin.renderHomePage);

router.route('/register')
    .get(admin.renderRegister)
    .post(catchAsync(admin.register));

router.use('/applicants', applicantRoutes);
router.use('/scholars', scholarRoutes);
router.use('/departments', departmentRoutes);
router.use('/supervisors', supervisorRoutes);
module.exports = router;

//CODE THAT IS NOT REQUIRED RIGHT NOW.BUT WE MAY NEED IT LATER
// const ExpressError = require('../../utils/ExpressError');
// const User = require('../../models/user');
// const Applicant = require('../../models/applicant');
// const passport = require('passport');