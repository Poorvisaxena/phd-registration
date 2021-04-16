module.exports.renderHomePage = (req, res) => {
    const { currentUser } = res.locals;
    if (currentUser.applicationStatus === "accepted") {
        res.render('templates/scholar/home');
    } else if (currentUser.applicationStatus === "onHold") {
        res.render('templates/applicationForm/onHold');
    } else if (currentUser.applicationStatus === "rejected") {
        res.render('templates/applicationForm/rejected');
    } else {
        res.render('templates/applicationForm/notSubmitted');
    }
};