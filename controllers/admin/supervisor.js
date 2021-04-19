const Supervisor = require('../../models/supervisor');
const User = require('../../models/user');
module.exports.indexPage = async (req, res) => {
    const supervisors = await Supervisor.find({});
    res.render('templates/admin/supervisors/index', { supervisors });
}
module.exports.renderNewForm = (req, res) => {
    res.render('templates/admin/supervisors/newForm');
}
module.exports.createSupervisor = async (req, res) => {
    let userID = req.flash('userID');
    req.body.userId = userID;
    const supervisor = new Supervisor(req.body);
    await supervisor.save();
    req.flash('success', 'Supervisor Added');
    res.redirect('/admin/supervisors');
}
module.exports.showPage = async (req, res) => {
    const { id } = req.params;
    const supervisor = await Supervisor.findById(id);
    console.log(supervisor.user_id);
    res.render('templates/admin/supervisors/show', { supervisor });
}
module.exports.editSupervisor = async (req, res) => {
    const { id } = req.params;
    const supervisor = await Supervisor.findByIdAndUpdate(id, req.body);
    res.redirect(`/admin/supervisors/${id}`);
}
module.exports.deleteSupervisor = async (req, res) => {
    const { id } = req.params;
    await Supervisor.findByIdAndDelete(id);
    res.redirect('/admin/supervisors');
}
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const supervisor = await Supervisor.findById(id);
    res.render('templates/admin/supervisors/editForm', { supervisor });
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('templates/registerForm', { originalPath: req.originalUrl });
}
module.exports.registerSupervisor = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/admin/supervisors/register');
        }
        const { role } = res.locals;
        const user = new User({ username, userType: role.Supervisor });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('userID', registeredUser._id);
        res.redirect('/admin/supervisors/new');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/admin/supervisors/register');
    }
}