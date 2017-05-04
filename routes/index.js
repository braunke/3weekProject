var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cycle', {
      title: 'Express',
      cycle: liftingProgram
  });
});
router.get('/workout/:week/:day', function(req, res, next) {

    var day = liftingProgram.weeks[req.params.week].days[req.params.day];
    res.render('workout', {
        title: 'Workout',
        day: day
    });
});

module.exports = router;
