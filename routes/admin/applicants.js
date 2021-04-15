const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');

const Applicant = require('../../models/applicant');
const User = require('../../models/user');
const Scholar = require('../../models/scholar');

router.get('/', catchAsync(async (req, res) => {
    const applicants = await Applicant.find({});
    res.render('templates/admin/applicants/index', { applicants });
}))
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    res.render('templates/admin/applicants/show', { applicant });
}))
router.get('/:id/accept', catchAsync(async (req, res) => {
    //something is wrong here
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    const applicationData = applicant.toObject();
    applicationData.registrationDate = new Date();
    delete applicationData._id;
    const scholar = new Scholar(applicationData);
    scholar.save();
    const currentUser = await User.findById(applicant.userId);
    currentUser.applicationStatus = "accepted";
    currentUser.save();
    await Applicant.findByIdAndRemove(id);
    req.flash('success', 'Application Accepted');
    res.redirect('/admin/applicants');
}));
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    const user = await User.findById(applicant.userId);
    user.applicationStatus = "rejected";
    user.save();
    await Applicant.findByIdAndDelete(id);
    req.flash('success', 'Application Deleted Successfully');
    res.redirect('/admin/applicants');
}));

module.exports = router;

// const ExpressError = require('../../utils/ExpressError');
// const passport = require('passport');
// const User = require('../../models/user');