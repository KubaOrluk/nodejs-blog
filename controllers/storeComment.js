const Comment = require('../database/models/Comment')

module.exports = (req, res) => {
    Comment.create(req.body, (error, comment) => {
        res.redirect('/')
    })
} 
