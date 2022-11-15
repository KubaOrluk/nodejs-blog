const User = require('../database/models/User')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            if(!error.errors){
                registrationErrors = 'User with those credentials already exists'
            }
            else{
                registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            }

            req.flash('registrationErrors', registrationErrors)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
} 
