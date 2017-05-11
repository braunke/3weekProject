var express = require('express');
var router = express.Router();
var Cycle = require('../models/cycle.js');
var User = require('../models/user.js');
var UserCycle = require('../models/userCycle.js');
var Lift = require('../models/lift.js');
//library to do date operations and format dates
var moment = require('moment');

/* GET page that shows a users cycle . */
router.get('/user/cycle/:id', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        //grabs user cycle from database based on id
        UserCycle.findById(req.params.id)
            //turns id into the object for user and cycle
            .populate('user cycle')
            .exec(function (err, userCycle) {
                if (err) {
                    return next(err);
                }
                //headers with the lifts
                userCycle.cycle.weeks[0].days.map(function(day) {
                    lifts.map(function(lift) {
                        if (lift._id == day.movement) {
                            day.movement = lift.name;
                        }
                    });
                });
                //renders the page
                res.render('cycle', {
                    title: userCycle.user.name + '\'s ' + userCycle.cycle.name,
                    userCycle: userCycle
                });
            });
    });
});
//page that shows a single days workout
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
                //gets the specific days depending on whick one was clicked
                var day = cycle.weeks[req.params.week].days[req.params.day];
                lifts.map(function(lift) {
                    //sets lift name to that day
                    if (lift._id == day.movement) {
                        day.movement = lift.name;
                    }
                    //sets which max is being used
                    userCycle.user.Max.map(function(max) {
                        if (lift._id == max.LiftType) {
                            max.LiftType = lift.name;
                        }
                    });
                });
                //renders the page
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
//pages that has your specific info
router.get('/user/:id', function(req, res, next) {
    Lift.find({}, function(err, lifts) {
        if (err) {
            return next(err);
        }
        //populating cycle dropdown options
        Cycle.find({}, function(err, cycles) {
            if (err) {
                return next(err);
            }
            //graps user based on id from database
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    return next(err);
                }
                //populates max lifts
                lifts.map(function (lift) {
                    user.Max.map(function (max) {
                        if (lift._id == max.LiftType) {
                            max.LiftType = lift.name;
                        }
                    });
                });
                //shows lift of user cycles
                UserCycle.find({user: req.params.id})
                    .populate('user cycle')
                    .exec(function (err, userCycles) {
                        if (err) {
                            return next(err);
                        }
                        //renders page
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
//pages that shows all users
router.get('/users', function(req, res, next) {
    //grabs users
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
//adding a new user
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
//editing a users info
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
//main / home page
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Home'
    });
});
//about page
router.get('/about', function(req, res, next) {
    res.render('about', {
        title: 'About'
    });
});
//saves user
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
//saves a new user cycle
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
