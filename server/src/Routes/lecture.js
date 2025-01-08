const express = require('express');
const { createLecture, getLectures, updateLecture, deleteLecture } = require('../Controller/lecture');


const lecture_router = express.Router()

lecture_router.post('/CreateLecture', createLecture);
lecture_router.get('/GetLecture', getLectures);
lecture_router.put('/UpdateLecture/:id', updateLecture);
lecture_router.delete('/DeleteLecture', deleteLecture);

module.exports = { lecture_router }


