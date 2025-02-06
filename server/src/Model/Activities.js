const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({

    ActivitiesName: {
        type: String,
    },
    ActivitiesSubject: {
        type: String,
    },
    ActivitiesDate: {
        type: String,
    },
    ActivitiesTime: {
        type: String,
    },
    ActivitiesDescription: {
        type: String,
    },
    Img: {
        type: String,
        required: true
    },

}, { timestamps: true });


module.exports = mongoose.model('Activities', ActivitiesSchema);