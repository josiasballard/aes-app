const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, full_name, role } = req.body;

    if (!email || !password || !full_name || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, full_name, role]
        );

        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid credentials (No user found)" });
        }

        const user = users[0];

        // 🚀 **DEBUG LOGS: Check if the user & password hash exist**
        console.log("User found:", user);
        console.log("Entered Password:", password);
        console.log("Stored Hash:", user.password_hash);

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            console.log("❌ Password does NOT match!");
            return res.status(401).json({ error: "Invalid credentials (Password mismatch)" }); 
        }

        console.log("✅ Password MATCHED!");

        const token = jwt.sign(
            { id: user.id, role: user.role, full_name: user.full_name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role, full_name: user.full_name });
    } catch (error) {
        console.error("💥 Error logging in:", error);
        res.status(500).json({ error: "Error logging in" });
    }
});

// ✅ Export Router
module.exports = router;
