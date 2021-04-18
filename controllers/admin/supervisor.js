const Supervisor = require('../../models/supervisor');

module.exports.indexPage = async (req, res) => {
    const supervisors = await Supervisor.find({});
    res.render('templates/admin/supervisors/index', { supervisors });
}
module.exports.renderNewForm = (req, res) => {
    res.render('templates/admin/supervisors/newForm');
}