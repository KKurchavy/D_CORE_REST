const mongoose = require('mongoose');
const { UserSchema } = require('../schemas/user.schema');
const passportLocalMongose =require('passport-local-mongoose');


exports.UserModel = mongoose.model('User', UserSchema);