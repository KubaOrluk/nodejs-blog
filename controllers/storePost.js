const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const post = new Post(req.body);

    post.username = req.session.username;
  
    post
    .save()
    
    return res.redirect(`/post/${post._id}`);
}

