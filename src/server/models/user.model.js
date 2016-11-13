var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    displayName: String,
    googleId: String,

});

var User = mongoose.model('User', userSchema);

module.exports = User;