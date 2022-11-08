const Post = require('../database/models/Post');
const Comment = require('../database/models/Comment');

module.exports = async (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
    .save()
    .then(() => Post.findById(req.params.id))
    .then((post) => {
        post.comments.unshift(comment);
        return post.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => {
        console.log(err);
    });
}