const express = require('express');
const { CreateMarksheet } = require('../Controller/marksheet');

const marksheet_router = express.Router()

marksheet_router.post('/CreateMarksheet', CreateMarksheet);
// marksheet_router.get('/GetLecture', getLectures);
// marksheet_router.put('/UpdateLecture/:id', updateLecture);
// marksheet_router.delete('/DeleteLecture', deleteLecture);

module.exports = { marksheet_router}


