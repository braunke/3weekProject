//defines the structure of a user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    bar: Number,
    Max: [{
        LiftType: String,
        Weight: Number
    }]
});
var User = mongoose.model('User', userSchema);
module.exports = User;