const express = require('express');
const { uploadGalleryPage, getAllGalleryPages, updateGalleryPage, deleteGalleryPage } = require('../Controller/galleryPage');
const { upload } = require('../Middleware/aws')

const GalleryPage_router = express.Router();

GalleryPage_router.post('/uploadGPa', upload.single('Img'), uploadGalleryPage);
GalleryPage_router.get('/getGPa', getAllGalleryPages);
GalleryPage_router.put('/updateGPa/:id', upload.single('Img'), updateGalleryPage);
GalleryPage_router.delete('/deleteGPa/:id', deleteGalleryPage);

module.exports = { GalleryPage_router };