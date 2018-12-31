const {Schema} = require('mongoose');

const TokenSchema = new Schema({
    token: String,
    userId: String
});

exports.TokenSchema = TokenSchema;