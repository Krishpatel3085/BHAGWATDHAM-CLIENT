// Teacher create update delaete
const teacherSchema = require('../Model/teacher')

// Create
const createTeacher = async (req, res) => {
    try {
        const { email, password, username } = req.body;



    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}