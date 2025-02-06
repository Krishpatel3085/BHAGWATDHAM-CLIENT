const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({

    grade: {
        type: String,
        required: true
    },
    lectureNo: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
    },
    startTime :{
        type: String,
    },
    endTime :{
        type: String,
    },
    id:{
        type: String,
    }


}, { timestamps: true });


module.exports = mongoose.model('Lecture', lectureSchema);