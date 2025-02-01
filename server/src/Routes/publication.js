const express = require('express');
const { CreatePublication, GetPublication, upload } = require('../Controller/Publication');


const publication_router = express.Router()

publication_router.post('/CreatePublication', upload.single('Img'), CreatePublication);
publication_router.get('/getPublication', GetPublication);
// publication_router.put('/updateTG/:id', upload.single('Img'), updateTempleGallery);
// publication_router.delete('/deleteTG/:id', deleteTempleGallery);

module.exports = { publication_router }


