const MarksheetSchema = require('../Model/marksheet')

// Create a Marksheet
const CreateMarksheet = async (req, res) => {
    try {
        const { studentName, rollNo, Class, examType, totalMarks, percentage, result, name, marks, grade,subjects } = req.body;
        console.log('first name: ', req.body)
        const newMarksheet = await MarksheetSchema.create({
            studentName,
            rollNo,
            Class,
            examType,
            totalMarks,
            percentage,
            result,
            subjects:subjects
        });

        res.status(201).json({ Message: "Marksheet Created", newMarksheet })
        console.log('Lecture added successfully', newMarksheet);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { CreateMarksheet };