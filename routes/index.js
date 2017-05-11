var express = require('express');
var router = express.Router();
var Cycle = require('../models/cycle.js');
var User = require('../models/user.js');
var UserCycle = require('../models/userCycle.js');
var Lift = require('../models/lift.js');
var moment = require('moment');

/* GET home page. */
router.get('/user/cycle/:id', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        UserCycle.findById(req.params.id)
            .populate('user cycle')
            .exec(function (err, userCycle) {
                if (err) {
                    return next(err);
                }
                userCycle.cycle.weeks[0].days.map(function(day) {
                    lifts.map(function(lift) {
                        if (lift._id == day.movement) {
                            day.movement = lift.name;
                        }
                    });
                });
                res.render('cycle', {
                    title: userCycle.user.name + '\'s ' + userCycle.cycle.name,
                    userCycle: userCycle
                });
            });
    });
});
router.get('/workout/:id/:week/:day', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        UserCycle.findById(req.params.id)
            .populate('user cycle')
            .exec(function(err, userCycle) {
                if (err){
                    return next(err);
                }
                var cycle = userCycle.cycle;
                var day = cycle.weeks[req.params.week].days[req.params.day];
                lifts.map(function(lift) {
                    if (lift._id == day.movement) {
                        day.movement = lift.name;
                    }
                    userCycle.user.Max.map(function(max) {
                        if (lift._id == max.LiftType) {
                            max.LiftType = lift.name;
                        }
                    });
                });
                return res.render('workout', {
                    title: 'Workout',
                    weekIndex: parseInt(req.params.week),
                    dayIndex: parseInt(req.params.day),
                    day: day,
                    userCycle: userCycle
                })
            });
    });
});
router.get('/user/:id', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        Cycle.find({}, function(err, cycles) {
            if (err) {
                return next(err);
            }
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    return next(err);
                }
                lifts.map(function (lift) {
                    user.Max.map(function (max) {
                        if (lift._id == max.LiftType) {
                            max.LiftType = lift.name;
                        }
                    });
                });
                UserCycle.find({user: req.params.id})
                    .populate('user cycle')
                    .exec(function (err, userCycles) {
                        if (err) {
                            return next(err);
                        }
                        res.render('user_cycles', {
                            title: 'User Cycles',
                            user: user,
                            lifts: lifts,
                            cycles: cycles,
                            userCycles: userCycles
                        });
                    });
            });
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
router.get('/user', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        res.render('user', {
            title: 'User',
            lifts: lifts
        });
    });
});
router.get('/user/:id/edit', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        User.findById(req.params.id, function (err, user) {
            if (err) {
                return next(err);
            }
            lifts.map(function(lift) {
                user.Max.map(function(max) {
                    if (lift._id == max.LiftType) {
                        max.LiftType = lift.name;
                    }
                });
            });
            res.render('user', {
                title: 'User',
                user: user,
                lifts: lifts
            });
        });
    });
});
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Home'
    });
});
router.put('/user', function(req, res, next) {
    var user = JSON.parse(req.body.user);
    if (user._id) {
        User.findByIdAndUpdate(user._id, { $set: user}, function (err, updatedUser) {
            if (err) return next(err);
            res.send(updatedUser);
        });
    } else {
        delete user._id;
        new User(user).save(function(err, newUser) {
            if (err) {
                return next(err);
            }
            res.send(newUser._id);
        });
    }
});
router.put('/userCycle', function(req, res, next) {
    var userCycle = JSON.parse(req.body.userCycle);
    userCycle.startDate = moment(userCycle.startDate);
    new UserCycle(userCycle).save(function(err, newUserCycle) {
        if (err) {
            return next(err);
        }
        res.json(newUserCycle);
    });
});
module.exports = router;
