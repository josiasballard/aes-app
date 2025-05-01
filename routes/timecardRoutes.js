const express = require("express");
const router = express.Router();
const pool = require("../db");
const { authenticateUser } = require("../middleware/authMiddleware");

// ✅ Helper: Calculate Hours Worked (Rounded to 0.25 increments)
const calculateHoursWorked = (start, end) => {
    const minutesWorked = (new Date(`1970-01-01T${end}Z`) - new Date(`1970-01-01T${start}Z`)) / (1000 * 60);
    return Math.round((minutesWorked / 60) * 4) / 4; // Round to nearest 0.25 hours
};

// ✅ 1️⃣ Submit Timecard
router.post("/submit", authenticateUser, async (req, res) => {
    const { date_worked, start_time, end_time, job_year, job_number, wage_type } = req.body;

    if (!date_worked || !start_time || !end_time || !job_year || !job_number || !wage_type) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // ✅ Find Active Job by Year & Number
        const [jobs] = await pool.query(
            "SELECT id FROM jobs WHERE job_year = ? AND job_number = ? AND is_active = 1 LIMIT 1",
            [job_year, job_number]
        );

        if (jobs.length === 0) {
            return res.status(400).json({ error: "No active job found matching your search." });
        }

        const job_id = jobs[0].id;
        const hours_worked = calculateHoursWorked(start_time, end_time);

        // ✅ Insert Timecard
        const [result] = await pool.query(
            "INSERT INTO timecards (user_id, job_id, date_worked, start_time, end_time, hours_worked, wage_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [req.user.id, job_id, date_worked, start_time, end_time, hours_worked, wage_type]
        );

        res.status(201).json({ message: "Timecard submitted successfully", timecardId: result.insertId });
    } catch (error) {
        console.error("💥 Error submitting timecard:", error);
        res.status(500).json({ error: "Error submitting timecard" });
    }
});

// ✅ 2️⃣ Employee Views Their Own Timecards
router.get("/my-timecards", authenticateUser, async (req, res) => {
    try {
        const [timecards] = await pool.query(
            "SELECT * FROM timecards WHERE user_id = ? ORDER BY date_worked DESC",
            [req.user.id]
        );

        res.json(timecards);
    } catch (error) {
        res.status(500).json({ error: "Error fetching timecards" });
    }
});

// ✅ 3️⃣ Employee Approves Their Timecard
router.put("/verify/:id", authenticateUser, async (req, res) => {
    try {
        const [result] = await pool.query(
            "UPDATE timecards SET verified_by_employee = 1 WHERE id = ? AND user_id = ?",
            [req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(403).json({ error: "Unauthorized or already verified" });
        }

        res.json({ message: "Timecard verified" });
    } catch (error) {
        res.status(500).json({ error: "Error verifying timecard" });
    }
});

// ✅ 4️⃣ Accountant Finalizes Timecards
router.put("/accountant-approve", authenticateUser, async (req, res) => {
    if (req.user.role !== "GOAT" && req.user.role !== "HR") {
        return res.status(403).json({ error: "Access forbidden" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE timecards SET accountant_verified = 1 WHERE verified_by_employee = 1"
        );

        res.json({ message: `Accountant finalized ${result.affectedRows} timecards` });
    } catch (error) {
        res.status(500).json({ error: "Error finalizing timecards" });
    }
});

// ✅ Export Router
module.exports = router;
