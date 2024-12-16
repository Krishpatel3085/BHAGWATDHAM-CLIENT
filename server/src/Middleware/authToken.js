const jwt = require("jsonwebtoken");

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(" ")[1]
        let verification = null;
        verification = jwt.verify(token, "xkhbo697")

        req.user = { id: verification["id"], username: verification["username"], role: verification["role"] }
        req.token = token
        next();
    } catch (error) {
        res.json({
            msg: "token is not valid"
        })
    }
};

module.exports = { authenticateToken };