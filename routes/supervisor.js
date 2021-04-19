const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const supervisors = require('../controllers/supervisor');

router.get('/', isLoggedIn, catchAsync(supervisors.renderHomePage));

module.exports = router;
