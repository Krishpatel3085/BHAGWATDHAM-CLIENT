const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({

    Subject: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    ExamDate: {
        type: String,
        required: true
    },
    ExamTime: {
        type: String,
        required: true
    },
    Room: {
        type: String,
        required: true
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users_Admin'
    },
    status: {
        type: String,
        enum: ['Upcoming', 'In Progress', 'Completed'],
    }

}, { timestamps: true });


module.exports = mongoose.model('Exam', ExamSchema);