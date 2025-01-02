const express = require('express')
const { createStudent, updateStudent, deleteStudent, getStudentById } = require("../Controller/student")


const student_router = express.Router()

student_router.get('/getStudent/:id', getStudentById)
student_router.post('/CreateStudent', createStudent)
student_router.delete('/deleteStudent/:id', deleteStudent)
student_router.put('/UpdateStudent', updateStudent)

module.exports = { student_router };