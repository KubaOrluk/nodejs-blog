const Post = require('../database/models/Post');
const Comment = require('../database/models/Comment');

module.exports = async (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = await Comment.findById(req.params.comment_id);
    
    if (!comment) {
        return res.status(404).json({ msg: "Post do not have this comment" });
    }
    if (!req.session.adminname) {
        return res.status(401).json({ msg: "User not authorized" });
    }
    
    // SAVE INSTANCE OF Comment MODEL TO DB
    //await comment.remove();
    comment
    .remove()
    .then(() => Post.findById(req.params.id))
    .then((post) => {
        post.comments.shift(comment);
        return post.comments.remove();
    })
    .then(() => res.redirect('back'))
    .catch((err) => {
        console.log(err);
    });
}