const mongoose = require('mongoose');

// create teacher schema

const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    password: {

    },
    employeeNo: {
        type: Number,
        unique: true,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    subjects: [{
        type: String,
        ref: 'Subject'
    }],
    grade: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);