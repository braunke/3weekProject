var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var index = require('./routes/index');
var users = require('./routes/users');
var helpers = require('handlebars-helpers')();

var app = express();
var mongo_pw = process.env.MONGO_PW;
var url = 'mongodb://userAdmin:' + mongo_pw + '@localhost:27017/weight?authSource=admin';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', hbs({
        //helper for hbs to calcualte weight needed for each movementd
        helpers: {
            lift: function (user, movement, percent) {
                var max = 200; // grab max from user
                return max * percent;
            }
        },
        extname: '.hbs',
        defaultLayout: 'layout'
    }));

    app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', function (req, res, next) {
        req.db = db;
        next();
    });
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
});
module.exports = app;
