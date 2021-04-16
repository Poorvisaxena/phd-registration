const Scholar = require('../../models/scholar');

module.exports.indexPage = async (req, res) => {
    const scholars = await Scholar.find({});
    res.render('templates/admin/scholars/index', { scholars });
}

module.exports.showPage = async (req, res) => {
    const { id } = req.params;
    const scholar = await Scholar.findById(id);
    res.render('templates/admin/scholars/show', { scholar });
}