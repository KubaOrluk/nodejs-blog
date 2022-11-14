const Admin = require('../database/models/Admin')

module.exports = (req, res, next) => {
    Admin.findById(req.session.adminId, (error, admin) => {
        if (error || !admin) {
            return res.redirect('/')
        }

        next()
    })
}