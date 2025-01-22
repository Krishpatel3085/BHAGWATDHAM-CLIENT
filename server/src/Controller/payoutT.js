const teacherSchema = require('../Model/teacher')

const updateTeacherPayout = async (req, res) => {
    try {
        const { bonus, employeeNo, total, salary, NetPay, month, paymentMethod } = req.body;
        console.log("Teacher data:", req.body);

        if (!employeeNo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let status = (total === NetPay) ? 'paid' : 'pending';
        // Update the student record
        const updatedTeacher = await teacherSchema.findOneAndUpdate(
            { employeeNo },
            { bonus, total, salary, status, month, NetPay, paymentMethod },
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