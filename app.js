'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require ('express-session');
const bcrypt = require('bcrypt');

const indexRouter = require('./routes/index');
const adsRouter = require('./routes/ads');
const loginRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionMinutes = 2;
const sessionTimeLimit = sessionMinutes * 60 * 1000;
app.use(session({
    secret: 'Yad3',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: sessionTimeLimit }
}));

app.use('/', indexRouter);
app.use('/', adsRouter);
app.use('/', loginRouter);
app.use('/', adminRouter);

const db = require('./models/index');
db.sequelize.sync()
    .then(() => {
        console.log('Database Synced');
        return Promise.all([
            db.User.findOrCreate({
                where: { username: 'admin' },
                defaults: { username: 'admin', password: 'admin' }
            }),
            db.User.findOrCreate({
                where: { username: 'admin2' },
                defaults: { username: 'admin2', password: 'admin2' }
            })
        ]);
    }).then(() => {
    console.log('Admin user created');
    }).catch((err) => {
        console.log('Error syncing database or creating admin users');
        console.log(err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { pageTitle: err.message });
});

module.exports = app;