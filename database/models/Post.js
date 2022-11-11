const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true
    },
    description:    {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;