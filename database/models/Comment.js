const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;