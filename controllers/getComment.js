const Comment = require('../database/models/Comment')

module.exports = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.render("post", {
        comment
    });
}