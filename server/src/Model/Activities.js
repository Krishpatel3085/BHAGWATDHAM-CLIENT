const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({

    ActivitiesName: {
        type: String,
        // required: true
    },
    ActivitiesSubject: {
        type: String,
        // required: true
    },
    ActivitiesDate: {
        type: String,
        // required: true
    },
    ActivitiesTime: {
        type: String,
        // required: true
    },
    ActivitiesDescription: {
        type: String,
        // required: true
    },
    Img: {
        type: String,
        required: true
    },

}, { timestamps: true });


module.exports = mongoose.model('Activities', ActivitiesSchema);