const express = require('express')
const { createExam, getAllExam, deleteExam, UpdateExam } = require("../Controller/Exam")
const { authenticateToken } = require("../Middleware/authToken")

const exam_router = express.Router()

exam_router.get('/getExam', getAllExam)
exam_router.post('/CreateExam', authenticateToken, createExam)
exam_router.delete('/DeleteExam/:id', deleteExam)
exam_router.put('/UpdateExam/:id', UpdateExam)

module.exports = { exam_router };