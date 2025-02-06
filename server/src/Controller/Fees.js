const studentSchema = require('../Model/student')

const updateStudentFees = async (req, res) => {
    try {
        const { TotalAmount, PaidAmount, studentId, dueDate, Fees } = req.body;
        

        if (!TotalAmount || !PaidAmount || !studentId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let status = (TotalAmount === PaidAmount) ? 'paid' : 'pending';

        const currentDate = Date.now();

        if (dueDate && new Date(dueDate).getTime() === currentDate) {
            status = 'due';
        }

        // Update the student record
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { studentId },
            { Fees: Fees },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student Fees updated successfully",
            updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Fees by id
const getStudentFees = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const students = await studentSchema.find({ Student: _id });
        res.status(200).json({ students });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { updateStudentFees, getStudentFees };