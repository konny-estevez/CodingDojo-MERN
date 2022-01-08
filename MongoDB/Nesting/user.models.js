const mongoose = require('mongoose');

const Person = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
});

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    friends: [Person],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;