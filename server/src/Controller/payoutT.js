const teacherSchema = require('../Model/teacher')

const updateTeacherPayout = async (req, res) => {
    try {
        const { bonus, deductions, employeeNo, salary, status } = req.body;
        console.log("Teacher data:", req.body);

        if (!bonus || !deductions || !employeeNo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update the student record
        const updatedTeacher = await teacherSchema.findOneAndUpdate(
            { employeeNo },
            { bonus, deductions, salary, status },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            message: "Teacher Fees updated successfully",
            updatedTeacher,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { updateTeacherPayout };