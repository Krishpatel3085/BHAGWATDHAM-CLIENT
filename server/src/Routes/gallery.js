const express = require('express');
const { uploadTempleGallery, upload, getAllTempleGallery, updateTempleGallery, deleteTempleGallery } = require('../Controller/gallery');

const TempleGallery_router = express.Router();

TempleGallery_router.post('/uploadTG', upload.single('Img'), uploadTempleGallery);
TempleGallery_router.get('/getTG', getAllTempleGallery);
TempleGallery_router.put('/updateTG/:id', upload.single('Img'), updateTempleGallery);
TempleGallery_router.delete('/deleteTG/:id', deleteTempleGallery);

module.exports = { TempleGallery_router };