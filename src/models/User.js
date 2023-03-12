const { Schema, model} = require('mongoose');
const md5 = require('md5');

const UserSchema= new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async function (password) {
    return await md5(password);
};

UserSchema.methods.matchPassword = async function (password) {
    const encryptPassword = this.password;
    const hashedPassword = md5(password);
    return await encryptPassword === hashedPassword;
}

module.exports = model('User', UserSchema);