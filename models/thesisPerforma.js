const mongoose = require('mongoose');
const { Schema } = mongoose;
const thesisPerformaSchema = new Schema({
    // write here
});
const ThesisPerforma = mongoose.model('ThesisPerforma', thesisPerformaSchema);
module.exports = ThesisPerforma;