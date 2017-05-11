//linking table to associate a user with a cycle with a start date
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCycleSchema = new Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cycle : { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle' },
    startDate : Date
});
var UserCycle = mongoose.model('UserCycle', userCycleSchema);
module.exports = UserCycle;