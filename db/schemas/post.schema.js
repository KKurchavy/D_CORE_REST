const {Schema} = require('mongoose');

const PostSchema = new Schema({
    author: String,
    text: String,
    groupId: String,
    avatar: String
});

exports.PostSchema = PostSchema;