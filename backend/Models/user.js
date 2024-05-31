const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
 
});

userSchema.plugin(passportLocalMongoose);


userSchema.methods.comparePassword = function(password) {
  console.log('Comparing passwords:', password, this.Password);
  return password === this.Password; 
};

module.exports = mongoose.model('User', userSchema);
