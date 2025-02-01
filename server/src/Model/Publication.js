const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({

    Publication: {
        type: String,
        enum: ['Kirtan', 'Katha', 'Video', 'Book', 'Wallpaper'],
        // required: true
    },
    PublicationName: {
        type: String,
        // required: true
    },
    Description: {
        type: String,
        // required: true
    },
    PublicationDate: {
        type: String,
        // required: true
    },
    Img: {
        type: String,
        // required: true
    },
    Link:{
        type: String,
        // required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Publication', PublicationSchema);