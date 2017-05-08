var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCycleSchema = new Schema({
    user : mongoose.Schema.Types.ObjectId,
    cycle : mongoose.Schema.Types.ObjectId,
    startDate : Date
});
var UserCycle = mongoose.model('UserCycle', userCycleSchema);
module.exports = UserCycle;