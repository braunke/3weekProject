var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
mongoose.Promise = require('bluebird');

var hbs = require('express-handlebars');
var index = require('./routes/index');
var users = require('./routes/users');
var seed = require('./seed');
var helpers = require('handlebars-helpers')();

var app = express();
var mongo_pw = process.env.MONGO_PW;
var url = process.env.MONGO_URL;
//var url = 'mongodb://userAdmin:' + mongo_pw + '@localhost:27017/weight?authSource=admin';
mongoose.connect(url);

seed();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    //helper for hbs to calculate weight needed for each movement
    helpers: {
        liftWeight: function (user, movement, percent) {

            if (user) {
                var index;
                for (x = 0; x < user.Max.length; x++) {
                    console.log(user.Max[x].LiftType, movement);
                    if (user.Max[x].LiftType === movement) {
                        index = x
                    }
                }
                var max = user.Max[index].Weight; // grab max from user
                return max * percent;
            }
            return '';
        },
        weekDate: function (startDate, weekIndex) {
            // use moment library to make date math easy!
            return moment(startDate).add(weekIndex, 'weeks').format('MMMM Do, YYYY');
        },
        dateFormat: function (startDate) {
            return moment(startDate).format('MMMM Do, YYYY');
        },
        now: function () {
            return moment().format('YYYY-MM-DD');
        },
        maxInputName: function (lift) {
            return 'max_' + lift.name.split(' ').join('_');
        }
    },
    extname: '.hbs',
    defaultLayout: 'layout'
}));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
if (app.get('env') == 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
});

module.exports = app;
