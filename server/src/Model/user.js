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
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending', // Default to Pending
    },
}, { timestamps: true });

module.exports = mongoose.model('Users_Admin', Users_Admin)