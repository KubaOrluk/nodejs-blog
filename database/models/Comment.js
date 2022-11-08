const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentContent: String,
    commentUsername: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;