const mongoose = require('mongoose');

// create teacher schema

const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    employeeNo: {
        type: String,
        unique: true,
    },
    salary: {
        type: Number,
    },
    address: {
        type: String,
    },
    age: {
        type: Number,
    },
    subject: {
        type: String,
        ref: 'Subject'
    },
    grade: {
        type: String,
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bonus: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    NetPay: {
        type: Number
    },
    status: {
        type: String,
    },
    month: {
        type: String,
    },
    url: {
        type: String
    },
    gender: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    Attendance: [{
        date: {
            type: Date,
            default: Date.now
        },
        attendance: {
            type: String,
            enum: ['present', 'absent']
        },
        remark: {
            type: String,
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);