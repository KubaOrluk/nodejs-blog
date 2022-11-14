module.exports = (req, res) => {
    res.render('loginadmin', {
        errors: req.flash('loginErrors')
    })
}