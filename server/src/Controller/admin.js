const Users_Admin = require("../Model/user");
const jwt = require("jsonwebtoken");


// Create User
const createAdmin = async (req, res) => {
    try {
        const { email, password, username, role } = req.body;

        if (!email || !password || !username || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const validRoles = ['Student', 'Teacher'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const existingUser = await Users_Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = await Users_Admin.create({
            email,
            password,
            username,
            role,
            status: "Pending"
        });

        res.status(201).json({ message: "Account created. Awaiting approval from principal.", user: newUser });

    } catch (error) {

        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update User Status
const updateUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body;

        // Validate status
        const validStatuses = ['Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find and update user
        const user = await Users_Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = status;
        await user.save();

        res.status(200).json({ message: `User ${status.toLowerCase()} successfully`, user });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get All Users (Protected)
const getAdmin = async (req, res) => {
    try {
        const user = await Users_Admin.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Login User and Generate Token
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Users_Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if account is approved
        if (user.status !== 'Approved') {
            return res.status(403).json({ message: "Your account is not approved yet. Please wait for approval." });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("data")

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        console.log("Generated token data:", tokenData);
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            id: user._id,
            username: user.username,
            role: user.role
        });

    } catch (error) {
        console.error("Can't Login User ", error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createAdmin, getAdmin, loginAdmin, updateUserStatus };