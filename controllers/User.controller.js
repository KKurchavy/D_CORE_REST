const { userRepository } = require('../repositories/user.repository');
 
class UserController {
    
    async findOne(email) {
        return await userRepository.findOne(email);
    }

    async findById(id) {
        return await userRepository.findById(id);
    }

    async findAll() {
        return await userRepository.findAll();
    }

    async create(user) {
        await userRepository.createOne(user);
    }

    async updateOne(id, user) {
        await userRepository.updateOne(id, user);
		return await userRepository.findById(id);
    }

    async deleteOne(id) {
        return await userRepository.deleteOne(id);
    }
}

exports.userController = new UserController();