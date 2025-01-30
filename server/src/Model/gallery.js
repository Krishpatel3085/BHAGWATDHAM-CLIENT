const mongoose = require('mongoose');


const TempleGallerySchema = new mongoose.Schema({

    ImageName: {
        type: String,
        // required: true
    },
    ImageSubject: {
        type: String,
        // required: true
    },
    Img: {
        type: String,
        // required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('TempleGallery', TempleGallerySchema);



// const mongoose = require('mongoose');


const GalleryPageSchema = new mongoose.Schema({

    ImageName: {
        type: String,
        // required: true
    },
    ImageSubject: {
        type: String,
        // required: true
    },
    Img: {
        type: String,
        // required: true
    },
    Imageyear:{
        type: String,
        // required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('GalleryPage', GalleryPageSchema);