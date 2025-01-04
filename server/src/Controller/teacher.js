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

        const { employeeNo, name, salary, address, age, subject, grade } = req.body;
        console.log(employeeNo)
        // Validation: Ensure all required fields are provided
        if (!employeeNo || !name || !address || !age || !subject || !grade) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedTeacher = await teacherSchema.findOneAndUpdate(
            { employeeNo },
            { name, salary, address, age, subject, grade },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            updatedTeacher,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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

// getTeacher by id
const getTeacherById = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const teacher = await teacherSchema.findOne({ Teacher: _id });
        console.log("check teacher", teacher)
        res.status(200).json({ Message: "Teacher found", teacher });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherSchema.find();
        res.status(200).json({ Message: "Teachers found", teachers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeacherById, createTeacher, updateTeacher, deleteTeacher, getAllTeachers };