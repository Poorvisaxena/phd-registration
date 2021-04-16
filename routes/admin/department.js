const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const Department = require('../../models/department')

const departments = require('../../controllers/admin/department');

router.get('/', catchAsync(departments.indexPage));

router.route('/:id')
    .patch(catchAsync(departments.editDepartment))
    .delete(catchAsync(departments.deleteDepartment));

router.get('/:id/edit', catchAsync(departments.renderEditForm));

router.post('/new', catchAsync(departments.createDepartment));

module.exports = router;
