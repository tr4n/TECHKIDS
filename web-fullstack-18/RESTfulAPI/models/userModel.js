const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    }
});

UserSchema.pre('save', function (next) {
  //  console.log(this);
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashPassword;
    }
    next();
})

module.exports = mongoose.model('User', UserSchema);