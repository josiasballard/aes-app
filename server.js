// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import existing routes
const authRoutes = require('./routes/authRoutes'); 
const timecardRoutes = require('./routes/timecardRoutes'); 
// Import new job routes
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON data in requests

// Check that routes are being correctly imported
if (!authRoutes || !timecardRoutes || !jobRoutes) {
    console.error("🚨 ERROR: One of the route files did not load correctly!");
    process.exit(1);
}

// Register routes BEFORE `app.listen()`
app.use('/auth', authRoutes);
app.use('/timecards', timecardRoutes);
app.use('/jobs', jobRoutes);  // Mount job routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
