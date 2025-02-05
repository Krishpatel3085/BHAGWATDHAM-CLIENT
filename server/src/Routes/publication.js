const express = require('express');
const { CreatePublication, GetPublication, upload, uploadBook, deletePublication, updatePublication } = require('../Controller/Publication');


const publication_router = express.Router()

publication_router.post('/CreatePublication', 
    upload.fields([{ name: 'Img', maxCount: 1 }, { name: 'Pdf', maxCount: 1 }]), 
    CreatePublication
);
publication_router.get('/getPublication', GetPublication);
publication_router.put('/updatePublication/:id', 
    upload.fields([{ name: 'Img', maxCount: 1 }, { name: 'Pdf', maxCount: 1 }]), 
    updatePublication
);

publication_router.delete('/deletePublication/:id', deletePublication);

module.exports = { publication_router }


