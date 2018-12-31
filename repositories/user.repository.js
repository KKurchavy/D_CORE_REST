const { UserModel } = require('../db/models/user.model');

class UserRepository {
    async findOne(email) {
        return await UserModel.findOne({ email });
    }

    async findById(id) {
        return await UserModel.findById(id);
    }

    async findAll() {
        return await UserModel.find({}, 'username _id avatar email');
    }
    
    async createOne(user) {
        return await UserModel.create(user);
    }

    async deleteOne(_id) {
        return await UserModel.deleteOne({_id});
    }

    async updateOne(_id, user){
        return await UserModel.updateOne({_id}, user);
    }
}

exports.userRepository = new UserRepository();