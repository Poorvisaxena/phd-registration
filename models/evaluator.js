const mongoose = require('mongoose');
const { Schema } = mongoose;
const evaluatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    universityName: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    correspondanceAddress: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    researchArea: {
        type: [String],
        required: true
    },
    evaluates: {
        // made array of strings in case a person can evaluate both thesis and synopsis
        type: [String],
        enum: ['thesis', 'synopsis'],
        required: true
    }
});
const Evaluator = mongoose.model('Evaluator', evaluatorSchema);
module.exports = Evaluator;