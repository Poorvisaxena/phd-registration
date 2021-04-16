const Applicant = require('../../models/applicant');
const Scholar = require('../../models/scholar');
const User = require('../../models/user');

module.exports.indexPage = async (req, res) => {
    const applicants = await Applicant.find({});
    res.render('templates/admin/applicants/index', { applicants });
}

module.exports.showPage = async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    res.render('templates/admin/applicants/show', { applicant });
}

module.exports.acceptApplication = async (req, res) => {
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
}

module.exports.rejectApplication = async (req, res) => {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    const user = await User.findById(applicant.userId);
    user.applicationStatus = "rejected";
    user.save();
    await Applicant.findByIdAndDelete(id);
    req.flash('success', 'Application Deleted Successfully');
    res.redirect('/admin/applicants');
}

