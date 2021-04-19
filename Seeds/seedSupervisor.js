const mongoose = require('mongoose');
const Supervisor = require('../models/supervisor');
mongoose.connect('mongodb://localhost:27017/phd-registration', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('Database connected')
    })
    .catch(e => {
        console.log("Unable to connect to Database");
        console.log(e);
    })
const res = Supervisor.deleteMany({}).then((data) => {
    mongoose.connection.close();
})