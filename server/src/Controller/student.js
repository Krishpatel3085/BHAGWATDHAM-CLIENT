// Teacher create update delaete
const studentSchema = require('../Model/student')
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config()


const aws = require('aws-sdk');
const multers3 = require('multer-s3')
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    })
})
// Create
const createStudent = async (req, res) => {
    try {
        const { name, ParentsName, ParentsMO, address, age, grade } = req.body;

        if (!name || !ParentsName || !ParentsMO || !age || !grade || !address) {
            return res.status(400).json({ message: "All fields are required" });
        };

        if (!Fees) {
            return res.status(400).json({ message: "Invalid grade, fees not found" });
        }

        // Create the new student with the assigned fees
        const newStudent = new studentSchema({
            name,
            ParentsName,
            ParentsMO,
            TotalAmount,
            PaidAmount,
            address,
            age,
            grade
        });

        await newStudent.save();

        res.status(201).json({ message: "Student created successfully", newStudent });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// /Profile imge upload
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
        
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required to update profile image" });
        }

        const student = await studentSchema.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (student.url) {
            const oldImageKey = student.url.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1]; // Extract the key from the URL
            console.log("Deleting old image:", oldImageKey);

            await s3
                .deleteObject({
                    Bucket: BUCKET_NAME,
                    Key: oldImageKey,
                })
                .promise();

            console.log("Old image deleted successfully");
        }
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { studentId },
            { $set: { url: url } },
            { new: true }
        );

        res.status(200).json({
            message: "Profile image uploaded and updated successfully",
            updatedStudent,
        });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: error.message });
    }
};


// Update

const updateStudent = async (req, res) => {
    try {

        const { name, parentName, parentPhone, address, age, grade, Fees, studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ message: "studentId is Required" });
        };
        const gradeFeesMap = {
            '1st': 1000,
            '2nd': 1200,
            '3rd': 1400,
            '4th': 1600,
            '5th': 1800,
            '6th': 2000,
            '7th': 2200,
            '8th': 2400,
            '9th': 2600,
            '10th': 2800,
            '11th Commerce': 3200,
            '11th Arts': 3000,
            '11th Science': 3400,
            '12th Commerce': 3500,
            '12th Arts': 3300,
            '12th Science': 3800,
        };

        // Fetch the fee based on the grade
        const TotalAmount = gradeFeesMap[grade];
        const PaidAmount = 0;
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { studentId },
            {
                name,
                parentName,
                address,
                age,
                parentPhone,
                grade,
                Fees: {
                    TotalAmount,
                    PaidAmount,
                },

            },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student updated successfully",
            updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete
const deleteStudent = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const deletedStudent = await studentSchema.findByIdAndDelete(_id);
        res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const student = await studentSchema.findOne({ Student: _id });
        res.status(200).json({ Message: "Student found", student });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await studentSchema.find();
        res.status(200).json({ message: "All students", students });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


// Create Attendance
const AttendanceCreate = async (req, res) => {
    try {
        const { status, remark, studentId, date } = req.body;

        if (!studentId) {
            return res.status(400).json({ message: "studentId is required" });
        }

        // Find the student and push the attendance entry
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { studentId: studentId },
            {
                $push: {
                    Attendance: {
                        date: date || new Date(), 
                        attendance: status,
                        remark:remark, 
                    },
                },
            },
            { new: true } 
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance: updatedStudent.Attendance,
        });
    } catch (error) {
        console.error("Error marking attendance:", error.message);
        res.status(500).json({ message: "Error marking attendance", error: error.message });
    }
};


module.exports = { createStudent, updateStudent, upload, deleteStudent, getStudentById, getAllStudents, uploadProfileImage, AttendanceCreate };