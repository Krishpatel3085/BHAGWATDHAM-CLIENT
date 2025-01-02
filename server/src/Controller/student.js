// Teacher create update delaete
const studentSchema = require('../Model/student')

// Create
const createStudent = async (req, res) => {
    try {
        const { name, ParentsName, ParentsMO, address, age, grade, Fees } = req.body;

        if (!name || !ParentsName || !ParentsMO || !age || !grade || !address) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const newStudent = new studentSchema({
            name,
            ParentsName,
            ParentsMO,
            Fees,
            address,
            age,
            grade
        });

        res.status(201).json({ mesaage: "Student created successfully", newStudent });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update
// const updateStudent = async (req, res) => {
//     try {
//         const { id: _id } = req.params;
//         const { name, ParentsName, ParentsMO, address, age, grade, Fees } = req.body;

//         if (!name || !ParentsName || !ParentsMO || !age || !grade || !address) {
//             return res.status(400).json({ message: "All fields are required" });
//         };

//         const updatedStudent = await studentSchema.findByIdAndUpdate(_id, req.body, { new: true });
//         res.status(200).json({ message: "Student updated successfully", updatedStudent });
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }


const updateStudent = async (req, res) => {
    try {

        const { name, parentName, parentPhone, address, age, grade, Fees, studentId } = req.body;
        console.log("Student date",req.body);
        if (!name || !parentName || !parentPhone || !age || !grade || !address) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { studentId },
            { name, parentName, address, age, parentPhone, grade },
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
module.exports = { createStudent, updateStudent, deleteStudent,getStudentById };