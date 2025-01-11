const MarksheetSchema = require('../Model/marksheet')

// Create a Marksheet
const CreateMarksheet = async (req, res) => {
    try {
        const { studentName, rollNo, Class, examType, totalMarks, percentage, result, name, marks, grade, subjects } = req.body;
        const newMarksheet = await MarksheetSchema.create({
            studentName,
            rollNo,
            Class,
            examType,
            totalMarks,
            percentage,
            result,
            subjects: subjects
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

module.exports = { CreateMarksheet, GetAllMarksheets, UpdateMarksheet, DeleteMarksheet };