const Admin = require('../database/models/Admin')

module.exports = (req, res, next) => {
    if (req.session.adminId) {
        return res.redirect('/')
    }

    next()
}

