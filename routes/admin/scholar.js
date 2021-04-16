const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');

const scholars = require('../../controllers/admin/scholar');

router.get('/', catchAsync(scholars.indexPage));

router.get('/:id', catchAsync(scholars.showPage));

module.exports = router;


//CODE THAT IS NOT NEEDE RIGHT NOW.BUT MIGHT BE USED LATER
// const ExpressError = require('../../utils/ExpressError');
// const passport = require('passport');
// const User = require('../../models/user');
// const Scholar = require('../../models/scholar');