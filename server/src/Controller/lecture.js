const lectureSchema = require('../Model/lecture')


const createLecture = async (req, res) => {
    try {
        const { dayOfWeek, subject, startTime, endTime, teacherName, grade, lectureNo, id } = req.body;

        console.log(req.body);

        // Validate the required fields
        if (!grade || !endTime || !startTime || !dayOfWeek || !subject || !teacherName) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        // Check if a lecture with the same dayOfWeek, startTime, and grade already exists
        const existingLecture = await lectureSchema.findOne({ dayOfWeek, startTime, grade });

        if (existingLecture) {
            // Update the existing lecture
            existingLecture.subject = subject;
            existingLecture.endTime = endTime;
            existingLecture.teacherName = teacherName;
            existingLecture.lectureNo = lectureNo;
            existingLecture.id = id;

            await existingLecture.save();

            res.status(200).json({ message: "Lecture updated successfully", lecture: existingLecture });
            console.log('Lecture updated successfully', existingLecture);
        } else {
            // Create a new lecture if no existing one matches
            const newLecture = await lectureSchema.create({
                grade,
                startTime,
                endTime,
                dayOfWeek,
                subject,
                teacherName,
                lectureNo,
                id
            });

            res.status(201).json({ message: "Lecture created successfully", lecture: newLecture });
            console.log('Lecture added successfully', newLecture);
        }
    } catch (error) {
        console.error('Error creating lecture:', error.message);
        res.status(400).json({ message: error.message });
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