const mongoose = require('mongoose')

const Users_Admin = new mongoose.Schema({

    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher'],  
    },
})

module.exports = mongoose.model('Users_Admin', Users_Admin)