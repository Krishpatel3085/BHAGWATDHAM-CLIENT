const express = require('express');
const {  CreateActivities, upload ,FetchAllActivities ,updateTActivities,deleteTempleActivities} = require('../Controller/Activities');

const Activities_router = express.Router();

Activities_router.post('/CreateActivities', upload.single('Img'), CreateActivities);
Activities_router.get('/FetchAllActivities', FetchAllActivities);
Activities_router.put('/updateActivities/:id', upload.single('Img'), updateTActivities);
Activities_router.delete('/deleteActivities/:id', deleteTempleActivities);

module.exports = { Activities_router };