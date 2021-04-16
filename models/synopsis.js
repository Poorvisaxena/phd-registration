const mongoose = require('mongoose');
const { Schema } = mongoose;
const synopsisSchema = new Schema({
    submissionDate: {
        type: Date,
        required: true
    },
    revisionDate: {
        type: Date,
        required: true
    },
    evaluatorsID: {
        type: [Schema.Types.ObjectId],
        ref: 'Evaluator',
        required: true
    },
    synopsisPerforma: {
        type: [Schema.Types.ObjectId],
        ref: 'SynopsisPerforma',
        required: true
    }
});
const Synopsis = mongoose.model('Synopsis', synopsisSchema);
module.exports = Synopsis;