
var User = require('./models/user');
var Cycle = require('./models/cycle');
var UserCycle = require('./models/userCycle');

function seed() {
    //creating initial data in database info found in web dev book
    Cycle.find(function (err, cycle) {
        if (err) return console.error(err);
        if(cycle.length) return;

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
        var user =  {
            name: 'Jim',
            max: {
                'Back Squat': 200,
                'Front Squat': 100
            }
        };

        new User (user).save(function(err, newUser) {
            new Cycle (liftingProgram).save(function(err, newCycle) {
                new UserCycle({
                    startDate: new Date(),
                    user: newUser._id,
                    cycle: newCycle._id
                }).save();
            });
        });

    });
}
module.exports = seed;