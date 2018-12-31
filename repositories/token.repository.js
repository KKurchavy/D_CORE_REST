const { TokenModel } = require('../db/models/token.model');

class TokenRepository {
    async findOne(refreshToken) {
        return await TokenModel.findOne({ token: refreshToken });
    }

    async createOne(token) {
        return await TokenModel.create(token);
    }

    async deleteOne(userId) {
        return await TokenModel.deleteOne({userId});
    }

}

exports.tokenRepository = new TokenRepository();