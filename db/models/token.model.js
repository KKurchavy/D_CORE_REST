const mongoose = require('mongoose');
const { TokenSchema } = require('../schemas/token.shema');

exports.TokenModel = mongoose.model('Token', TokenSchema);