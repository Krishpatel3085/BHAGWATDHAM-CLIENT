const mongoose = require('mongoose');

// create teacher schema

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ParentsName: {
        type: String,
        required: true
    },
    ParentsMO: {
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
    Fees: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);