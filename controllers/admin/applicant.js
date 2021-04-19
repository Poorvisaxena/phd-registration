const Applicant = require('../../models/applicant');
const Scholar = require('../../models/scholar');
const User = require('../../models/user');


// const populateResearchSupervisor = (applicants) => {

// }
module.exports.indexPage = async (req, res) => {
    const applicants = await Applicant.find({});
    res.render('templates/admin/applicants/index', { applicants });
}

module.exports.showPage = async (req, res, next) => {
    const { id } = req.params;
    // const applicant1 = await Applicant.findById(id);
    // console.log(applicant1.researchSupervisor);
    Applicant.findById(id)
        .populate({
            path: 'researchSupervisor',
            model: 'Supervisor',
            select: 'name'
        }).exec(function (err, applicant) {
            if (err) {
                return next(arr);
            } else {
                console.log(applicant.researchSupervisor);
                res.render('templates/admin/applicants/show', { applicant });
            }
        });
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

