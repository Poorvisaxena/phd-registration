const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const Department = require('../../models/department')

router.get('/', catchAsync(async (req, res) => {
    const departments = await Department.find({});
    res.render('templates/admin/departments/show', { departments });
}))
router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    res.render('templates/admin/departments/editForm', { department });
}));
router.patch('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    department.name = req.body.name;
    department.dept_id = req.body.dept_id;
    await department.save();
    res.redirect('/admin/departments');
}))
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    req.flash('success', 'Department Removed successfully');
    res.redirect('/admin/departments');
}))
router.post('/new', catchAsync(async (req, res) => {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    console.log(newDepartment);
    req.flash('success', 'Department added successfully');
    res.redirect('/admin/departments');
}))
module.exports = router;
