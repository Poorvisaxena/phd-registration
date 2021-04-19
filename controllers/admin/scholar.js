const Scholar = require('../../models/scholar');

module.exports.indexPage = async (req, res) => {
    const scholars = await Scholar.find({});
    res.render('templates/admin/scholars/index', { scholars });
}

module.exports.showPage = async (req, res, next) => {
    const { id } = req.params;
    Scholar.findById(id)
        .populate({
            path: 'researchSupervisor',
            model: 'Supervisor',
            select: 'name'
        }).exec(function (err, scholar) {
            if (err) {
                return next(err);
            } else {
                res.render('templates/admin/scholars/show', { scholar });
            }
        });
}