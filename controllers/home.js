const Department = require('../models/department');
const Applicant = require('../models/applicant');
const User = require('../models/user');

module.exports.homePage = (req, res) => {
    res.render('templates/home');
}

module.exports.renderApplicationForm = async (req, res) => {
    const currentUser = req.user;
    if (currentUser.applicationStatus === "notSubmitted") {
        const departments = await Department.find({});
        res.render('templates/applicationForm', { departments });
    } else {
        res.render('templates/applicationForm/submitted');
    }
}

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

module.exports.submitApplication = async (req, res) => {
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
}


