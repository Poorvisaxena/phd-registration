const Scholar = require('../models/scholar');
const Supervisor = require('../models/supervisor');

module.exports.renderHomePage = async (req, res) => {
    const userID = res.locals.currentUser._id;
    const supervisor = await Supervisor.find({ userId: userID });
    let id = supervisor.map(s => s._id);
    let scholars = [];
    if (id.length == 1) {
        id = id.toString();
        scholars = await Scholar.find({ researchSupervisor: id });
        console.log(scholars);
    }
    res.render('templates/supervisor/home');
}
