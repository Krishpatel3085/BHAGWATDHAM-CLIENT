const express = require('express')
const { getTeacherById, createTeacher, updateTeacher, deleteTeacher, getAllTeachers } = require("../Controller/teacher")


const teacher_router = express.Router()

teacher_router.get('/getTeacher/:id', getTeacherById)
teacher_router.get('/getAllTeacher', getAllTeachers)
teacher_router.post('/CreateTeacher', createTeacher)
teacher_router.delete('/deleteTeacher/:id', deleteTeacher)
teacher_router.put('/UpdateTeacher', updateTeacher)

module.exports = { teacher_router };