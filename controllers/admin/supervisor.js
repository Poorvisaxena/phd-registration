const Supervisor = require('../../models/supervisor');

module.exports.indexPage = async (req, res) => {
    const supervisors = await Supervisor.find({});
    res.render('templates/admin/supervisors/index', { supervisors });
}
module.exports.renderNewForm = (req, res) => {
    res.render('templates/admin/supervisors/newForm');
}
module.exports.createSupervisor = async (req, res) => {
    const supervisor = new Supervisor(req.body);
    await supervisor.save();
    req.flash('success', 'Supervisor Added');
    res.redirect('/admin/supervisors');
}
module.exports.showPage = async (req, res) => {
    const { id } = req.params;
    const supervisor = await Supervisor.findById(id);
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