// Teacher create update delaete
const studentSchema = require('../Model/teacher')

// Create
const createStudent = async (req, res) => {
    try {
        const { name, ParentsName, ParentsMO, address, age, grade, Fees } = req.body;

        if (!name || !ParentsName || !ParentsMO || !age || !grade || !address) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const newStudent = new studentSchema({
            name,
            ParentsName,
            ParentsMO,
            Fees,
            address,
            age,
            grade
        });

        res.status(201).json({ mesaage: "Student created successfully", newStudent });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update
const updateStudent = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { name, ParentsName, ParentsMO, address, age, grade, Fees } = req.body;

        if (!name || !ParentsName || !ParentsMO || !age || !grade || !address) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const updatedStudent = await studentSchema.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete
const deleteStudent = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const deletedStudent = await studentSchema.findByIdAndDelete(_id);
        res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
