const mongoose = require('mongoose');
const { Schema } = mongoose;
const synopsisPerformaSchema = new Schema({
    // write here
});
const SynopsisPerforma = mongoose.model('SynopsisPerforma', synopsisPerformaSchema);
module.exports = SynopsisPerforma;