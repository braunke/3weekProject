var express = require('express');
var router = express.Router();
var Cycle = require('../models/cycle.js');
var User = require('../models/user.js');
var userCycle = require('../models/userCycle.js');
var TYPES = {
    FSQUAT: 'Front Squat',
    BSQUAT: 'Back Squat'
};
var dayOne = {
    sets: [{
        weightPercentage: .60,
        reps: 10
    }, {
        weightPercentage: .70,
        reps: 8
    }, {
        weightPercentage: .75,
        reps: 6
    },{
        weightPercentage: .80,
        reps: 4
    }],
    movement: TYPES.BSQUAT
};
var dayTwo = {
    sets: [{
        weightPercentage: .60,
        reps: 10
    }, {
        weightPercentage: .70,
        reps: 8
    }, {
        weightPercentage: .75,
        reps: 6
    },{
        weightPercentage: .80,
        reps: 4
    }],
    movement: TYPES.FSQUAT
};
var dayThree = {
    sets: [{
        weightPercentage: .60,
        reps: 10
    }, {
        weightPercentage: .65,
        reps: 8
    }, {
        weightPercentage: .70,
        reps: 6
    },{
        weightPercentage: .75,
        reps: 6
    },{
        weightPercentage: .80,
        reps: 6
    }],
    movement: TYPES.BSQUAT
};
var dayFour = {
    sets: [{
        weightPercentage: .60,
        reps: 10
    }, {
        weightPercentage: .65,
        reps: 8
    }, {
        weightPercentage: .70,
        reps: 6
    },{
        weightPercentage: .75,
        reps: 6
    },{
        weightPercentage: .80,
        reps: 6
    }],
    movement: TYPES.FSQUAT
};
var dayFive= {
    sets: [{
        weightPercentage: .65,
        reps: 8
    }, {
        weightPercentage: .70,
        reps: 8
    }, {
        weightPercentage: .80,
        reps: 6
    },{
        weightPercentage: .85,
        reps: 6
    }],
    movement: TYPES.BSQUAT
};
var daySix= {
    sets: [{
        weightPercentage: .65,
        reps: 8
    }, {
        weightPercentage: .70,
        reps: 8
    }, {
        weightPercentage: .80,
        reps: 6
    },{
        weightPercentage: .85,
        reps: 6
    }],
    movement: TYPES.FSQUAT
};
var liftingProgram = {
    name: 'Hatch Cycle',

    weeks: [{
        days: [dayOne, dayTwo]
    }, {
        days: [dayThree, dayFour]
    },{
        days: [dayFive, daySix]
    }]};
var userLiftingProgram = {
    program: liftingProgram,
    startDate: new Date(),
    user: {
        name: 'Jim',
        max: {
            'Back Squat': 200,
            'Front Squat': 100
        }
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    Cycle.findOne({name:'Hatch Cycle'}, function(err, cycle) {
        if (err) {
            return next(err);
        }
        res.render('cycle', {
            title: cycle.name,
            cycle: cycle
        });
    });
});
router.get('/workout/:week/:day', function(req, res, next) {

    var day = liftingProgram.weeks[req.params.week].days[req.params.day];
    res.render('workout', {
        title: 'Workout',
        day: day
    });
});
router.get('/info', function(req, res, next) {
    res.render('info',{
        title: 'Info'
    });
});

module.exports = router;
