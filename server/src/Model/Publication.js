const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({

    Publication: {
        type: String,
        enum: ['Kirtan', 'Katha', 'Video', 'Book', 'Wallpaper'],
    },
    PublicationName: {
        type: String,
    },
    Description: {
        type: String,
    },
    PublicationDate: {
        type: String,
    },
    Img: {
        type: String,
    },
    Link: {
        type: String,
    },
    Pdf: {
        type: String,
    }
}, { timestamps: true });


module.exports = mongoose.model('Publication', PublicationSchema);