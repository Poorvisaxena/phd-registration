const mongoose = require('mongoose');
const { Schema } = mongoose;
const thesisSchema = new Schema({
    submissionDate: {
        type: Date,
        required: true
    },
    evaluatorsID: {
        type: [Schema.Types.ObjectId],
        ref: 'Evaluator',
        required: true
    },
    thesisPerforma: {
        type: [Schema.Types.ObjectId],
        ref: 'ThesisPerforma',
        required: true
    }
});
const Thesis = mongoose.model('Thesis', thesisSchema);
module.exports = Thesis;