const express = require('express')
const { createStudent, updateStudent, deleteStudent, getStudentById, getAllStudents, upload,uploadProfileImage} = require("../Controller/student")
const { updateStudentFees, getStudentFees } = require("../Controller/Fees")


const student_router = express.Router()

student_router.get('/getStudent/:id', getStudentById)
student_router.get('/getAllStudent', getAllStudents)
student_router.post('/CreateStudent', createStudent)
student_router.post('/uploadpi', upload.single("url"), uploadProfileImage)
student_router.delete('/deleteStudent/:id', deleteStudent)
student_router.put('/UpdateStudent', updateStudent)
student_router.put('/Fess', updateStudentFees)
student_router.get('/FessGet/:id', getStudentFees)

module.exports = { student_router };