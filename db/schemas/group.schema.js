const {Schema} = require('mongoose');

const GroupSchema = new Schema({
    author: String,
    info: String,
    name: String,
    subscribers: Array,
    isSubscribed: Boolean
});

GroupSchema.methods.checkSubscribe = function(userId) {
    const index = this.subscribers.findIndex(elem => (elem === userId));
    this.isSubscribed = index >= 0;
}

exports.GroupSchema = GroupSchema;