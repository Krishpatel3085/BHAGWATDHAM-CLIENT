const lectureSchema = require('../Model/lecture')


const createLecture = async (req, res) => {
    try {
        const { dayOfWeek, subject, startTime, endTime, teacherName, grade, lectureNo, id } = req.body

        console.log(req.body);
        if (!grade || !endTime || !startTime || !dayOfWeek || !subject || !teacherName) {
            return res.status(400).json({ message: 'Please provide all the required fields' })
        }
        const lecture = await lectureSchema.create({
            grade,
            startTime,
            endTime,
            dayOfWeek,
            subject,
            teacherName,
            lectureNo,
            id
        })
        res.status(201).json({ mesaage: "Event created successfully", lecture });
        console.log('Lecture added successfully', lecture)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
};
// GetLecture
const getLectures = async (req, res) => {
    try {
        const lectures = await lectureSchema.find();
        res.json(lectures)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Update Lecture
const updateLecture = async (req, res) => {
    try {
        const ids = req.params.id;
        console.log(ids)
        const data = { dayOfWeek, subject, startTime, endTime, teacherName, grade, lectureNo, id } = req.body
        const lecture = await lectureSchema.findByIdAndUpdate(ids, data, { new: true })
        if (!lecture) return res.status(404).json({ message: 'Lecture not found' })
        res.status(201).json({ Message: "Lecture Updated Successfully", lecture })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Delete Lecture
const deleteLecture = async (req, res) => {
    try {
        const id = req.params.id;
        const lecture = await lectureSchema.findByIdAndDelete(id)
        if (!lecture) return res.status(404).json({ message: 'Lecture not found' })
        res.json({ message: 'Lecture deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { createLecture, getLectures, updateLecture, deleteLecture }