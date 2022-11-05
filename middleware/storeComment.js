module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.content) {
        return res.redirect('/posts/new')
    }

    next()
}