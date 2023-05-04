const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please choose a username"]
  },
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  }, 
  tel: {
    type: String,
    required: true
  }, 
  email: {
    type: String, 
    required: true
  }, 
  password: {
    type: String,
    required: true
  }, 
  date: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);