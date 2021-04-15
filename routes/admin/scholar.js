const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const Scholar = require('../../models/scholar');

router.get('/', catchAsync(async (req, res) => {
    const scholars = await Scholar.find({});
    res.render('templates/admin/scholars/index', { scholars });
}))
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const scholar = await Scholar.findById(id);
    // res.send("Gor request");
    res.render('templates/admin/scholars/show', { scholar });
}))
module.exports = router;

// const ExpressError = require('../../utils/ExpressError');
// const passport = require('passport');
// const User = require('../../models/user');