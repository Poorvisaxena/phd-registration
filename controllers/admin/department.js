const Department = require('../../models/department')

module.exports.indexPage = async (req, res) => {
    const departments = await Department.find({});
    res.render('templates/admin/departments/show', { departments });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    res.render('templates/admin/departments/editForm', { department });
}

module.exports.editDepartment = async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    department.name = req.body.name;
    department.dept_id = req.body.dept_id;
    await department.save();
    res.redirect('/admin/departments');
}

module.exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    req.flash('success', 'Department Removed successfully');
    res.redirect('/admin/departments');
}

module.exports.createDepartment = async (req, res) => {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    req.flash('success', 'Department added successfully');
    res.redirect('/admin/departments');
}



