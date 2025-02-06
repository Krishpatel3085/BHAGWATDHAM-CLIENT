const mongoose = require('mongoose');

const MarksheetSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    Class: {
        type: String,
    },
    examType: {
        type: String,
        required: true
    },
    subjects: [{
        name: String,
        marks: Number,
        grade: String,
    }],
    totalMarks: {
        type: Number,
        required: true
    },
    percentage: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users_Admin'
    }

}, { timestamps: true });


module.exports = mongoose.model('Marksheet', MarksheetSchema);