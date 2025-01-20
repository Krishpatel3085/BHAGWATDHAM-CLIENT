const express = require('express')
const { getTeacherById, createTeacher, updateTeacher, deleteTeacher, getAllTeachers, uploadProfileImageTeacher, upload } = require("../Controller/teacher")
const { updateTeacherPayout } = require("../Controller/payoutT")


const teacher_router = express.Router()

teacher_router.get('/getTeacher/:id', getTeacherById)
teacher_router.get('/getAllTeacher', getAllTeachers)
teacher_router.post('/uploadpit', upload.single("url"), uploadProfileImageTeacher)

teacher_router.post('/CreateTeacher', createTeacher)
teacher_router.delete('/deleteTeacher/:id', deleteTeacher)
teacher_router.put('/UpdateTeacher', updateTeacher)
teacher_router.put('/Payout', updateTeacherPayout)

module.exports = { teacher_router };