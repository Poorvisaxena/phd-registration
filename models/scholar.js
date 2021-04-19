const mongoose = require('mongoose');
const { Schema } = mongoose;

const scholarSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    enrollmentNo: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    religion: {
        type: String
    },
    category: {
        type: String,
        enum: ['GEN', 'SC', 'ST', 'OBC', 'EWC', 'Other'],
        required: true
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    husbandName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    permanentAddress: {
        type: String
    },
    correspondanceAddress: {
        type: String
    },
    additionalExams: {
        type: [String]
    },
    submissionOfApplication: {
        type: Date
    },
    registrationDate: {
        type: Date
    },
    topic: {
        type: String,
        required: true
    },
    department: {
        // type: Schema.Types.ObjectId,
        // ref: 'Department',
        type: String,
        required: true
    },
    extensionDate: {
        type: Date
    },
    dayScholar: {
        type: Boolean
    },
    staffAtBanasthali: {
        type: Boolean
    },
    workAsTeacher: {
        type: Boolean
    },
    workExperience: [
        {
            companyName: String,
            duration: String,
            designation: String,
            domain: String
        }
    ],
    publicationsSubmitted: {
        type: Number
    },
    publicationsName: {
        type: [String]
    },
    vivaDate: {
        type: Date
    },
    researchSupervisor: {
        type: [Schema.Types.ObjectId],
        ref: 'Supervisor',
        required: true
    },
    guardian: {
        name: {
            type: String
        },
        contactNo: {
            type: Number
        },
        email: {
            type: String
        }
    },
    education: {
        highSchool: {
            boardName: String,
            yearOfPassing: Number,
            marksObtained: Number,
            maxMarks: Number,
            division: String,
            percentage: Number
        },
        seniorSecondary: {
            boardName: String,
            yearOfPassing: Number,
            marksObtained: Number,
            maxMarks: Number,
            division: String,
            percentage: Number
        },
        graduation: {
            degreeType: String,
            universityName: String,
            passingYear: Number,
            percentage: Number
        },
        postGraduation: {
            degreeType: String,
            universityName: String,
            passingYear: Number,
            percentage: Number
        }
    }
})

const Scholar = mongoose.model('Scholar', scholarSchema);
module.exports = Scholar;