const path = require('path')
const Post = require('../database/models/Post')

module.exports = (req, res) => {
    Post.create(req.body, (error, post) => {
        if (error) {
            const postErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.flash('postErrors', postErrors)
            return res.redirect('/posts/new')
        }
        res.redirect('/')
    })
}

