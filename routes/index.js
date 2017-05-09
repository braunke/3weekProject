var express = require('express');
var router = express.Router();
var Cycle = require('../models/cycle.js');
var User = require('../models/user.js');
var UserCycle = require('../models/userCycle.js');

/* GET home page. */
router.get('/user/cycle/:id', function(req, res, next) {
    UserCycle.findById(req.params.id)
        .populate('user cycle')
        .exec(function(err, userCycle) {
        if (err) {
            return next(err);
        }
        var cycle = userCycle.cycle;
        res.render('cycle', {
            title: cycle.name,
            cycle: cycle,
            userCycleId: userCycle._id
        });
    });
});
router.get('/workout/:id/:week/:day', function(req, res, next) {
    UserCycle.findById(req.params.id)
        .populate('user cycle')
        .exec(function(err, userCycle) {
            if (err){
                return next(err);
            }
            var cycle = userCycle.cycle;
            var user = userCycle.user;
            return res.render('workout', {
                title: 'Workout',
                day: cycle.weeks[req.params.week].days[req.params.day],
                user : user.Max
            })
        });
});
router.get('/user/:id/cycles', function(req, res, next) {
    UserCycle.find({user: req.params.id})
        .populate('user cycle')
        .exec(function(err, userCycles) {
            if (err) {
                return next(err);
            }
            res.render('user_cycles', {
                title: 'User Cycles',
                userCycles: userCycles
            });
        });
});
router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        res.render('users', {
            title: 'Users',
            users: users
        });
    });
});
router.get('/info', function(req, res, next) {
    res.render('info',{
        title: 'Info'
    });
});

module.exports = router;
