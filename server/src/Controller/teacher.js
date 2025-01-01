// Teacher create update delaete
const teacherSchema = require('../Model/teacher')

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

// Update
const updateTeacher = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { name, employeeNo, salary, address, age, subject, grade } = req.body;

        if (!name || !employeeNo || !address || !age || !subject || !grade) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const updatedTeacher = await teacherSchema.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

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
