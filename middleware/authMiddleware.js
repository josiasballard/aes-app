const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const tokenWithoutBearer = token.replace("Bearer ", "").trim();
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access forbidden. Insufficient permissions." });
        }
        next();
    };
};

// ✅ Ensure both functions are properly exported
module.exports = { authenticateUser, authorizeRoles };
