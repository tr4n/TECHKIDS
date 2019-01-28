const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: {type: String, unique: true, require: true}, 
    password: {type: String, require: true},
    name: {type: String, default: ''}, 
    avatar: {type: String, default: ''},
    gender: {type: String, default:''}
});

module.exports = mongoose.model('User', UserModel);