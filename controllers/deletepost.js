const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const post = await Post.findById(req.params.id);
    
    if (!post) {
        return res.status(404).json({ msg: "Post with this id doesn't exist" });
    }
    if (!req.session.adminname) {
        return res.status(401).json({ msg: "User not authorized" });
    }
    
    // SAVE INSTANCE OF Comment MODEL TO DB
    //await comment.remove();
    post
    .remove()
    .then(() => Post.findById(req.params.id))
    .then((post) => {
        //post.comments.shift();
        //return post.comments.remove();
    })
    .then(() => res.redirect('back'))
    .catch((err) => {
        console.log(err);
    });
}