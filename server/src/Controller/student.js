// Teacher create update delaete
const studentSchema = require('../Model/student')

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
            '11th commerce': 3200,
            '11th arts': 3000,
            '11th science': 3400,
            '12th commerce': 3500,
            '12th arts': 3300,
            '12th science': 3800,
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
        console.log("check student", student)
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
module.exports = { createStudent, updateStudent, deleteStudent, getStudentById, getAllStudents };