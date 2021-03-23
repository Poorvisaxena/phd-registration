const mongoose = require('mongoose');
const User = require('../models/user');
mongoose.connect('mongodb://localhost:27017/phd-registration', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('Database connected')
    })
    .catch(e => {
        console.log("Unable to connect to Database");
        console.log(e);
    })
User.deleteMany({}).then((data) => {
    mongoose.connection.close();
})

