const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const Supervisor = require('../../models/supervisor')

const supervisors = require('../../controllers/admin/supervisor');

router.get('/', catchAsync(supervisors.indexPage));
router.get('/new', supervisors.renderNewForm);
//     /admin/supervisors/:id

module.exports = router;


/*
all evaluators : /admin/evaluators   : index page
particular evaluators : /admin/evaluators/:id  : show page
new evaluator : /admin/evaluators/new
edit particular : /admin/evaluators/:id/edit ->get form dislay
edit particular : /admin/evaluators/:id/edit ->patch (Actual edit backend)
delete /admin/evaluators/:id  ->Delete
*/