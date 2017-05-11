//defines the structure for a lift --set up to eventually add more lifts
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var liftSchema = new Schema({
    name: String
});
var Lift = mongoose.model('Lift', liftSchema);
module.exports = Lift;