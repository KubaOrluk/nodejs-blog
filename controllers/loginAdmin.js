const bcrypt = require('bcrypt')
const Admin = require('../database/models/Admin')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user
    Admin.findOne({
        email
    }, (error, admin) => {
        if (admin) {
            // compare passwords.
            bcrypt.compare(password, admin.password, (error, same) => {
                if (same) {
                    req.session.adminId = admin._id
                    req.session.adminname = admin.adminname
                    res.redirect('/')
                } else {
                    const loginErrors = 'Incorrect password2'
                    req.flash('loginErrors', loginErrors)
                    res.redirect('/adminlogin')
                }
            })
        }
        else {
            const loginErrors = 'User does not exist2'
            req.flash('loginErrors', loginErrors)
            return res.redirect('/adminlogin')
        }
    })
}