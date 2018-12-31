const mongoose = require('mongoose');
const { PostSchema } = require('../schemas/post.schema');

exports.PostModel = mongoose.model('Post', PostSchema);