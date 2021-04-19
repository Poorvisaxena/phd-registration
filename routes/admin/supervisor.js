const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const Supervisor = require('../../models/supervisor')

const supervisors = require('../../controllers/admin/supervisor');

router.get('/', catchAsync(supervisors.indexPage));
router.route('/register')
    .get(supervisors.renderRegisterForm)
    .post(catchAsync(supervisors.registerSupervisor));

router.route('/new')
    .get(supervisors.renderNewForm)
    .post(catchAsync(supervisors.createSupervisor));

router.route('/:id')
    .get(catchAsync(supervisors.showPage))
    .patch(catchAsync(supervisors.editSupervisor))
    .delete(catchAsync(supervisors.deleteSupervisor));

router.get('/:id/edit', supervisors.renderEditForm);

module.exports = router;


/*
all evaluators : /admin/evaluators   : index page
particular evaluators : /admin/evaluators/:id  : show page
new evaluator : /admin/evaluators/new
edit particular : /admin/evaluators/:id/edit ->get form dislay
edit particular : /admin/evaluators/:id/edit ->patch (Actual edit backend)
delete /admin/evaluators/:id  ->Delete
*/