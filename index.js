const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('./models/user');

//add routes here.make sure to foloow the same pattern
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin/admin');
const scholarRoutes = require('./routes/scholar');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/phd-registration', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('Database connected')
    })
    .catch(e => {
        console.log("Unable to connect to Database");
        console.log(e);
    })

const app = express();

const portNo = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.role = {
        Admin: 1,
        Vc: 2,
        Supervisor: 3,
        Evaluator: 4,
        Hod: 5,
        General: 6
    }
    next();
})

// routes are added Headers.while writing please keep in mind the order
app.use('/admin', adminRoutes);
app.use('/', homeRoutes);
app.use('/', scholarRoutes);

//Page Not found error
//If the request matched with none of the routes then this will be displayed
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})
//this is a custom error hadler.
//whenever you call next with an argument.it ends up here.
//Basically it prints the error out on the screen

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    if (!err.statusCode) err.statusCode = 500;
    res.status(statusCode).render('error', { err });
})
app.listen(portNo, () => {
    console.log("Listening on Port 3000");
})
