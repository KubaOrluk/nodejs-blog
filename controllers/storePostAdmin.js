const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const post = new Post(req.body)

    if(!post.content && !post.title){
        const postErrors = 'Content and title field can not be empty'
        req.flash('postErrors', postErrors)
        return res.redirect('/posts/new')
    }
    else if(!post.title){
        const postErrors = 'Please specify a title'
        req.flash('postErrors', postErrors)
        return res.redirect('/posts/new')
    }
    else if(!post.content){
        const postErrors = 'Content field can not be empty'
        req.flash('postErrors', postErrors)
        return res.redirect('/posts/new')
    }
    else{
        post.username = req.session.adminname;
  
        post
        .save()
    
        return res.redirect(`/post/${post._id}`);
    }
}

