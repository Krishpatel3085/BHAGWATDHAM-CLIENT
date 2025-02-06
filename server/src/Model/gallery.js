const mongoose = require('mongoose');


const TempleGallerySchema = new mongoose.Schema({

    ImageName: {
        type: String,
    },
    ImageSubject: {
        type: String,
    },
    Img: {
        type: String,
    }

}, { timestamps: true });


module.exports = mongoose.model('TempleGallery', TempleGallerySchema);


