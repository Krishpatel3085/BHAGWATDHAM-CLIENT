
const mongoose = require('mongoose');


const GalleryPageSchema = new mongoose.Schema({

    ImageName: {
        type: String,
    },
    ImageSubject: {
        type: String,
    },
    Img: {
        type: String,
    },
    Imageyear:{
        type: String,
    }

}, { timestamps: true });


module.exports = mongoose.model('GalleryPage', GalleryPageSchema);