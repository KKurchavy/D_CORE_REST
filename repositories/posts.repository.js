const { PostModel } = require('../db/models/post.model');

class PostsRepository {

    async findAll(groupId) {
        return await PostModel.find({groupId}, "author text avatar _id");
    }
    
    async createOne(post) {
        return await PostModel.create(post);
    }

}

exports.postsRepository = new PostsRepository();