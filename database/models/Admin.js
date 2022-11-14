const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { isValidPassword } = require('mongoose-custom-validators')

const AdminSchema = new mongoose.Schema({
    adminname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: isValidPassword,
            message: 'Password must have: 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 10 characters long.'
        }
    }
})

AdminSchema.pre('save', function (next) {
    const admin = this

    bcrypt.hash(admin.password, 10, function (error, encrypted) {
        admin.password = encrypted
        next()
    })
})

module.exports = mongoose.model('Admin', AdminSchema)
