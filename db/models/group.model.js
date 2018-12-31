const mongoose = require('mongoose');
const { GroupSchema } = require('../schemas/group.schema');

exports.GroupModel = mongoose.model('Group', GroupSchema);