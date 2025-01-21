const mongoose = require('mongoose');

// create teacher schema

const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true
    },
    employeeNo: {
        type: String,
        unique: true,
        // required: true
    },
    salary: {
        type: Number,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
        // required: true
    },
    subject: {
        type: String,
        ref: 'Subject'
    },
    grade: {
        type: String,
        // required: true
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
        // required: true
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
    gender:{
        type: String,
        // required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);