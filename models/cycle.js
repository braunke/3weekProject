//defines the structure for a cycle
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cycleSchema = new Schema({
        name: String,
        weeks: [{
            days: [ {
                sets: [{
                    weightPercentage: Number,
                    reps: Number
                }],
                movement: String
            }]
        }]
});
var Cycle = mongoose.model('Cycle', cycleSchema);
module.exports = Cycle;