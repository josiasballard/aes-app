// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure your db.js is correctly configured

// GET /jobs/max?year=YYYY - Retrieve the maximum job_number for a given year
router.get('/max', async (req, res) => {
  const year = req.query.year;
  try {
    // We assume job_number is numeric (or can be cast to number)
    const [rows] = await pool.query('SELECT MAX(CAST(job_number AS UNSIGNED)) AS maxNumber FROM jobs WHERE job_year = ?', [year]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching max job number:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /jobs - Retrieve all jobs from the database
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /jobs/:publicId - Retrieve a specific job by its public_id
router.get('/:publicId', async (req, res) => {
  const publicId = req.params.publicId;
  try {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE public_id = ?', [publicId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /jobs - Create a new job
router.post('/', async (req, res) => {
  const {
    job_year,
    job_number,
    job_description,
    contractor,
    location,
    permit_number,
    date_started,
    date_completed,
    hero_image,
    uploaded_images,
    is_special
  } = req.body;

  // Generate a random public_id (9-digit number)
  const publicId = Math.floor(Math.random() * 1e9);

  try {
    const [result] = await pool.query(
      `INSERT INTO jobs 
      (job_year, job_number, job_description, contractor, location, permit_number, date_started, date_completed, hero_image, uploaded_images, is_special, public_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [job_year, job_number, job_description, contractor, location, permit_number, date_started, date_completed, hero_image, uploaded_images, is_special, publicId]
    );
    res.status(201).json({ id: result.insertId, public_id: publicId, ...req.body });
  } catch (err) {
    console.error("Error inserting job:", err);
    res.status(500).json({ error: "Database error" });
  } 
});

module.exports = router;
