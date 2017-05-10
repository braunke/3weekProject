
var User = require('./models/user');
var Cycle = require('./models/cycle');
var UserCycle = require('./models/userCycle');
var Lift = require('./models/lift');

function seed() {
    //creating initial data in database info found in web dev book
    Cycle.find(function (err, cycle) {
        if (err) return console.error(err);
        if(cycle.length) return;

        function buildObjects(frontSquatId, backSquatId) {
            var TYPES = {
                FSQUAT: frontSquatId,
                BSQUAT: backSquatId
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
            var daySeven= {
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
            var dayEight= {
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
            var dayNine= {
                sets: [{
                    weightPercentage: .65,
                    reps: 8
                }, {
                    weightPercentage: .75,
                    reps: 6
                }, {
                    weightPercentage: .85,
                    reps: 4
                },{
                    weightPercentage: .90,
                    reps: 4
                }],
                movement: TYPES.BSQUAT
            };
            var dayTen= {
                sets: [{
                    weightPercentage: .65,
                    reps: 8
                }, {
                    weightPercentage: .75,
                    reps: 6
                }, {
                    weightPercentage: .85,
                    reps: 4
                },{
                    weightPercentage: .90,
                    reps: 4
                }],
                movement: TYPES.FSQUAT
            };
            var dayEleven= {
                sets: [{
                    weightPercentage: .70,
                    reps: 6
                }, {
                    weightPercentage: .80,
                    reps: 6
                }, {
                    weightPercentage: .90,
                    reps: 3
                },{
                    weightPercentage: .95,
                    reps: 2
                }],
                movement: TYPES.BSQUAT
            };
            var dayTwelve= {
                sets: [{
                    weightPercentage: .70,
                    reps: 6
                }, {
                    weightPercentage: .80,
                    reps: 6
                }, {
                    weightPercentage: .90,
                    reps: 3
                },{
                    weightPercentage: .95,
                    reps: 2
                }],
                movement: TYPES.FSQUAT
            };
            var dayThirteen= {
                sets: [{
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .80,
                    reps: 5
                }, {
                    weightPercentage: .85,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 3
                },{
                    weightPercentage: 1,
                    reps: 1
                }],
                movement: TYPES.BSQUAT
            };
            var dayForteen= {
                sets: [{
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .80,
                    reps: 5
                }, {
                    weightPercentage: .85,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 3
                },{
                    weightPercentage: 1,
                    reps: 1
                }],
                movement: TYPES.FSQUAT
            };
            var dayFifteen= {
                sets: [{
                    weightPercentage: .65,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .75,
                    reps: 5
                },{
                    weightPercentage: .80,
                    reps: 5
                }],
                movement: TYPES.BSQUAT
            };
            var daySixteen= {
                sets: [{
                    weightPercentage: .65,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .75,
                    reps: 5
                },{
                    weightPercentage: .80,
                    reps: 5
                }],
                movement: TYPES.FSQUAT
            };
            var daySeventeen= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 3
                }, {
                    weightPercentage: .80,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 2
                },{
                    weightPercentage: .95,
                    reps: 1
                }],
                movement: TYPES.BSQUAT
            };
            var dayEighteen= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 3
                }, {
                    weightPercentage: .80,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 2
                },{
                    weightPercentage: .95,
                    reps: 1
                }],
                movement: TYPES.FSQUAT
            };
            var dayNineteen= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .65,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                },{
                    weightPercentage: .75,
                    reps: 5
                }],
                movement: TYPES.BSQUAT
            };
            var dayTwenty= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .65,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                },{
                    weightPercentage: .75,
                    reps: 5
                }],
                movement: TYPES.FSQUAT
            };
            var dayTwentyone= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 3
                }, {
                    weightPercentage: .80,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 2
                },{
                    weightPercentage: .95,
                    reps: 1
                },{
                    weightPercentage: 1.03,
                    reps: 1
                }],
                movement: TYPES.BSQUAT
            };
            var dayTwentytwo= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 3
                }, {
                    weightPercentage: .80,
                    reps: 2
                },{
                    weightPercentage: .90,
                    reps: 2
                },{
                    weightPercentage: .95,
                    reps: 1
                },{
                    weightPercentage: 1.03,
                    reps: 1
                }],
                movement: TYPES.FSQUAT
            };
            var dayTwentythree= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .75,
                    reps: 5
                },{
                    weightPercentage: .75,
                    reps: 5
                }],
                movement: TYPES.BSQUAT
            };
            var dayTwentyfour= {
                sets: [{
                    weightPercentage: .60,
                    reps: 5
                }, {
                    weightPercentage: .70,
                    reps: 5
                }, {
                    weightPercentage: .75,
                    reps: 5
                },{
                    weightPercentage: .75,
                    reps: 5
                }],
                movement: TYPES.FSQUAT
            };
            liftingProgram = {
                name: 'Hatch Cycle',
                weeks: [{
                    days: [dayOne, dayTwo]
                }, {
                    days: [dayThree, dayFour]
                },{
                    days: [dayFive, daySix]
                },{
                    days: [daySeven, dayEight]
                },{
                    days: [dayNine, dayTen]
                },{
                    days: [dayEleven, dayTwelve]
                },{
                    days: [dayThirteen, dayForteen]
                },{
                    days: [dayFifteen, daySixteen]
                },{
                    days: [daySeventeen, dayEighteen]
                },{
                    days: [dayNineteen, dayTwenty]
                },{
                    days: [dayTwentyone, dayTwentytwo]
                }, {
                    days: [dayTwentythree, dayTwentyfour]
                }]
            };
            user =  {
                name: 'Jim',
                Max: [{
                    LiftType: TYPES.BSQUAT,
                    Weight: 200
                }, {
                    LiftType: TYPES.FSQUAT,
                    Weight: 100
                }]
            };
        }
        var user, liftingProgram;

        new Lift({name: 'Front Squat'}).save(function(err, frontSquat) {
            new Lift({name: 'Back Squat'}).save(function(err, backSquat) {
                buildObjects(frontSquat._id, backSquat._id);
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
        });

    });
}
module.exports = seed;