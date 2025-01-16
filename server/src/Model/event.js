const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    EventName: {
        type: String,
        required: true
    },
    EventDate: {
        type: Date,
        required: true
    },
    EventTime: {
        type: String,
        required: true
    },
    EventDescriptions: {
        type: String,
        required: true
    },
    EventStatus:{
        type:String,
    }

}, { timestamps: true });


module.exports = mongoose.model('Event', EventSchema);