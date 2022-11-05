const Comment = require('../database/models/Comment')

module.exports = async (req, res) => {
    const comments = await Comment.find({});

    res.render("post", {
        comments
    });
}