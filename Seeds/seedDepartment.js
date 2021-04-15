const mongoose = require('mongoose');
const Department = require('../models/department');
mongoose.connect('mongodb://localhost:27017/phd-registration', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('Database connected')
    })
    .catch(e => {
        console.log("Unable to connect to Database");
        console.log(e);
    })
const departmentList = [
    { name: "Computer Science", dept_id: "dept1" },
    { name: "Pharmacy", dept_id: "dept2" },
    { name: "Chemistry", dept_id: "dept3" },
    { name: "Chemical Engineering", dept_id: "dept4" },
    { name: "Bio-science and  Biotechnology", dept_id: "dept5" },
    { name: "Electronics", dept_id: "dept6" },
    { name: "Mathematical Science", dept_id: "dept7" },
    { name: "Physics", dept_id: "dept8" },
    { name: "Sanskrit, Philosophy and Vedic Studies", dept_id: "dept9" },
    { name: "Hindi and Modern Indian Languages", dept_id: "dept10" },
    { name: "English and Modern European Languages", dept_id: "dept11" },
    { name: "Economics", dept_id: "dept12" },
    { name: "History and Indian Culture", dept_id: "dept13" },
    { name: "Political Science and Public Administration", dept_id: "dept14" },
    { name: "Sociology", dept_id: "dept15" },
    { name: "Physical Education", dept_id: "dept16" },
    { name: "Performing Arts", dept_id: "dept17" },
    { name: "Visual Art", dept_id: "dept18" },
    { name: "Home-science", dept_id: "dept19" },
    { name: "Education", dept_id: "dept20" },
    { name: "Commerce and Banking", dept_id: "dept21" },
    { name: "Management", dept_id: "dept22" },
    { name: "Design", dept_id: "dept23" },
    { name: "Legal Studies", dept_id: "dept24" },
    { name: "Psychology", dept_id: "dept25" },
    { name: "Journalism and Mass Communication", dept_id: "dept26" },
    { name: "Earth Sciences", dept_id: "dept27" },
    { name: "Aviation", dept_id: "dept28" },
    { name: "Automation", dept_id: "dept29" }
];
seedDepartment = async function () {
    for (let department of departmentList) {
        try {
            const dept = new Department(department);
            await dept.save();
        } catch (e) {
            console.log(e);
        }
    }
};
Department.deleteMany({}).then(() => {
    seedDepartment().then(() => {
        mongoose.connection.close();
    })
})

