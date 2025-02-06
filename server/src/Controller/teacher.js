// Teacher create update delaete
const teacherSchema = require('../Model/teacher')
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
const createTeacher = async (req, res) => {
    try {
        const { name, employeeNo, salary, address, age, subject, grade } = req.body;

        if (!name || !employeeNo || !address || !age || !subject || !grade) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const newTeacher = new teacherSchema({
            name,
            employeeNo,
            salary,
            address,
            age,
            subject,
            grade
        });

        res.status(201).json({ mesaage: "Teacher created successfully", newTeacher });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update the teacher
const updateTeacher = async (req, res) => {
    try {
        const { employeeNo, name, salary, address, age, subject, grade, Bonus = 0, Deductions = 0 } = req.body;

        console.log(employeeNo);
        console.log(req.body);

        // Validation: Ensure all required fields are provided
        if (!employeeNo || !name || !address || !age || !subject || !grade) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Calculate NetPay
        const NetPay = Number(salary) + Number(Bonus) - Number(Deductions);

        // Update teacher record
        const updatedTeacher = await teacherSchema.findOneAndUpdate(
            { employeeNo },
            {
                name,
                salary,
                address,
                age,
                subject,
                grade,
                Bonus,
                Deductions,
                NetPay,
            },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            updatedTeacher,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// /Profile imge upload
const uploadProfileImageTeacher = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
        console.log("Uploaded file URL:", url);

        const { employeeNo } = req.body;

        if (!employeeNo) {
            return res.status(400).json({ message: "Employee ID is required to update profile image" });
        }

        const teacher = await teacherSchema.findOne({ employeeNo });

        if (!teacher) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (teacher.url) {
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
        const updatedteacher = await teacherSchema.findOneAndUpdate(
            { employeeNo },
            { $set: { url: url } },
            { new: true }
        );

        res.status(200).json({
            message: "Profile image uploaded and updated successfully",
            updatedteacher,
        });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete
const deleteTeacher = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const deletedTeacher = await teacherSchema.findByIdAndDelete(_id);
        res.status(200).json({ message: "Teacher deleted successfully", deletedTeacher });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// getTeacher by id
const getTeacherById = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const teacher = await teacherSchema.findOne({ Teacher: _id });
       
        res.status(200).json({ Message: "Teacher found", teacher });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherSchema.find();
        res.status(200).json({ Message: "Teachers found", teachers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const AttendanceCreate = async (req, res) => {
    try {
        const { status, remark, employeeNo, date } = req.body;
       
        if (!employeeNo) {
            return res.status(400).json({ message: "employeeNo is required" });
        }

        // Find the student and push the attendance entry
        const UpdateTeacher = await teacherSchema.findOneAndUpdate(
            { employeeNo: employeeNo },
            {
                $push: {
                    Attendance: {
                        date: date || new Date(),
                        attendance: status,
                        remark: remark,
                    },
                },
            },
            { new: true }
        );

        if (!UpdateTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance: UpdateTeacher.Attendance,
        });
    } catch (error) {
        console.error("Error marking attendance:", error.message);
        res.status(500).json({ message: "Error marking attendance", error: error.message });
    }
};

module.exports = { getTeacherById, createTeacher, updateTeacher, deleteTeacher, getAllTeachers, uploadProfileImageTeacher, upload, AttendanceCreate };