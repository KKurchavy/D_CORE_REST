const { groupRepository } = require('../repositories/group.repository');
 
class GroupController {
    
    async findOne(id, userId = "") {
        const group = await groupRepository.findOne(id);
        group.checkSubscribe(userId);
        return group;
    }

    async findAll() {
        return await groupRepository.findAll();
    }

    async create(group) {
        return await groupRepository.createOne(group);
    }

    async updateOne(id, group) {
		return await groupRepository.updateOne(id, group);
    }

    async deleteOne(id) {
        await groupRepository.deleteOne(id);
    }
}

exports.groupController = new GroupController();