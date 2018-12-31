const { GroupModel } = require('../db/models/group.model');

class GroupRepository {
    async findOne(_id) {
        return await GroupModel.findOne({ _id });
    }

    async findAll() {
        return await GroupModel.find({}, 'name _id author');
    }
    
    async createOne(group) {
        return await GroupModel.create(group);
    }

    async deleteOne(_id) {
        return await GroupModel.deleteOne({_id});
    }

    async updateOne(_id, group){
        return await GroupModel.updateOne({_id}, group);
    }
}

exports.groupRepository = new GroupRepository();