var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    Max: [{
        LiftType: String,
        Weight: Number
    }]
});
var User = mongoose.model('User', userSchema);
module.exports = User;