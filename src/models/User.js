const {Schema, model} = require('mongoose');

const UserSchema= new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
}, {
  timestamps: true,
});

UserSchema.methods.encryptPassword = function(password) {
  return password;
};

UserSchema.methods.matchPassword = async function(password) {
  const encryptPassword = this.password;
  const hashedPassword = password;
  return await encryptPassword === hashedPassword;
};

module.exports = model('User', UserSchema);
