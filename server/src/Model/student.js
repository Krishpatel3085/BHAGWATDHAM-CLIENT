const mongoose = require('mongoose');

// create teacher schema

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true
    },
    studentId: {
        type: String,
        // required: true
    },
    parentName: {
        type: String,
        // required: true
    },
    parentPhone: {
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
    Fees: {
        type: String,
        // required: true
    },
    grade: {
        type: String,
        // required: true
    },
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);