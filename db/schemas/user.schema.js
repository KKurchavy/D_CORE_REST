const { Schema } = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const {MD5} = require("crypto-js");

const UserSchema = new Schema({
  email: String,
  password: String,
  username: String,
  info: String,
  location: String,
  favoriteLang: String,
  age: Number,
  avatar: String
});

UserSchema.pre("save", function(next) {
  let user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
    });
  });

  user.avatar = `http://gravatar.com/avatar/${MD5(this.email)}?s=400&d=monsterid`;
  next();
});

exports.UserSchema = UserSchema;
