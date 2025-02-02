const express = require('express');
const { CreatePublication, GetPublication, upload, deletePublication, updatePublication } = require('../Controller/Publication');


const publication_router = express.Router()

publication_router.post('/CreatePublication', upload.single('Img'), CreatePublication);
publication_router.get('/getPublication', GetPublication);
publication_router.put('/updatePublication/:id', upload.single('Img'), updatePublication);
publication_router.delete('/deletePublication/:id', deletePublication);

module.exports = { publication_router }


