const { Schema, model} = require('mongoose');
const md5 = require('md5');

const UserSchema= new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = function (password) {
    return md5(password);
};

UserSchema.methods.matchPassword = function (password) {
    const encryptPassword = this.password;
    const hashedPassword = md5(password);
    return encryptPassword === hashedPassword;
}

module.exports = model('User', UserSchema);