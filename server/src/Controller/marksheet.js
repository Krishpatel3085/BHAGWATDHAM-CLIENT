const MarksheetSchema = require('../Model/marksheet')
const StudentSchema = require('../Model/student')

// Create a Marksheet
const CreateMarksheet = async (req, res) => {
    try {
        const { studentName, rollNo, Class, examType, totalMarks, percentage, result, subjects } = req.body;
        const studentID = await StudentSchema.findOne({ studentId: rollNo, name: studentName });
        if (!studentID) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const Student = studentID.Student;

        const newMarksheet = await MarksheetSchema.create({
            studentName,
            rollNo,
            Class,
            examType,
            totalMarks,
            percentage,
            result,
            subjects: subjects,
            Student

        });

        res.status(201).json({ Message: "Marksheet Created", newMarksheet })
        console.log('Lecture added successfully', newMarksheet);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// Get All MArksheets
const GetAllMarksheets = async (req, res) => {
    try {
        const marksheets = await MarksheetSchema.find();
        res.status(200).json({ marksheets })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get Marksheet by ID
const GetMarksheetById = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const marksheets = await MarksheetSchema.find({ Student: _id });
        if (!marksheets) {
            return res.status(404).json({ error: 'Marksheet not found' });
        }
        res.status(200).json({ marksheets })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update MArksheet
const UpdateMarksheet = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const marksheet = await MarksheetSchema.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ marksheet })
        console.log('Marksheet updated successfully', marksheet);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Marksheet Delete
const DeleteMarksheet = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const marksheet = await MarksheetSchema.findByIdAndDelete(_id);
        res.status(200).json({ message: "Marksheet deleted successfully" })
        console.log('Marksheet deleted successfully', marksheet);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { CreateMarksheet, GetAllMarksheets, UpdateMarksheet, DeleteMarksheet, GetMarksheetById };