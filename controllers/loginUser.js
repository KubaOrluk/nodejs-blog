const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    req.session.username = user.username
                    res.redirect('/')
                } else {
                    const loginErrors = 'Incorrect password'
                    req.flash('loginErrors', loginErrors)
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            const loginErrors = 'User does not exist'
            req.flash('loginErrors', loginErrors)
            return res.redirect('/auth/login')
        }
    })
}