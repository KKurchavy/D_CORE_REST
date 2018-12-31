const { postsRepository } = require('../repositories/posts.repository');
 
class PostsController {

    async findAll(groupId) {
        return await postsRepository.findAll(groupId);
    }

    async create(post) {
        return await postsRepository.createOne(post);
    }

}

exports.postsController = new PostsController();