const { tokenRepository } = require('../repositories/token.repository');
 
class TokenController {
    
    async findOne(refreshToken) {
        const token = await tokenRepository.findOne(refreshToken);
        return token;
    }

    async create(token) {
        return await tokenRepository.createOne(token);
    }

    async deleteOne(userId) {
        await tokenRepository.deleteOne(userId);
    }
}

exports.tokenController = new TokenController();