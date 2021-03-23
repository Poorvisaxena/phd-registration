const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    userType: {
        type: Number,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose);
//the above package add on to the user schema a username and a password.
//It also makes sure that the username's are unique and provide some extra functionality
const User = mongoose.model('User', userSchema);
module.exports = User;