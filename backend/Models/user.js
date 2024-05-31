const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  Username: { type: String, unique: true },
  Name: { type: String },
  Email: { type: String, unique: true },
  Password: { type: String },
  role: {
    type: String,
    default: 'Travaler',
    enum: ['admin', 'Travaler'],
  },
});

userSchema.plugin(passportLocalMongoose);


userSchema.methods.comparePassword = function(password) {
  console.log('Comparing passwords:', password, this.Password);
  return password === this.Password; 
};

module.exports = mongoose.model('User', userSchema);
