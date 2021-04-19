const mongoose = require('mongoose');
const { Schema } = mongoose;
const supervisorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    emp_id: {
        // on hold
        type: String
    },
    designation: {
        type: String
    },
    researchArea: {
        type: [String],
        required: true
    },
    email: {
        type: String
    },
    contactNo: {
        type: Number,
        required: true
    },
    supervisorType: {
        type: String,
        enum: ['internal', 'external'],
        required: true
    },
    dept_name: {
        type: String
    },
    universityName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const Supervisor = mongoose.model('Supervisor', supervisorSchema);
module.exports = Supervisor;