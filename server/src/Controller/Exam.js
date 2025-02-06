const ExamSchema = require('../Model/exam')

// Create an event

const createExam = async (req, res) => {
    try {
        const User = req.user['id'];
        const { Subject, Class, ExamDate, ExamTime, Room, status } = req.body;

        if (!Subject || !Class || !ExamDate || !ExamTime || !Room) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const Teacher = User
        const newExam = await ExamSchema.create({
            Subject,
            Class,
            ExamDate,
            ExamTime,
            Room,
            status,
            Teacher: Teacher
        });

        console.log("Create", newExam);
        res.status(201).json({ mesaage: "Event created successfully", newExam });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// Get all events
const getAllExam = async (req, res) => {
    try {
        const exams = await ExamSchema.find();
        res.status(200).json({ Message: "exams found", exams });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// //  update events
const UpdateExam = async (req, res) => {
    try {
        const exam = await ExamSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exam) return res.status(404).json({ message: "Exam not found" });
        res.json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// // Delete event
const deleteExam = async (req, res) => {
    try {
        const exam = await ExamSchema.findByIdAndDelete(req.params.id);
        if (!exam) return res.status(404).json({ message: "Exam not found" });
        res.json({ message: "Exam deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { createExam, getAllExam, UpdateExam, deleteExam };
