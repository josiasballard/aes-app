const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const timecardRoutes = require('./routes/timecardRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json());

if (!authRoutes || !timecardRoutes || !jobRoutes) {
    console.error("🚨 ERROR: One of the route files did not load correctly!");
    process.exit(1);
}

// Register routes
app.use('/auth', authRoutes);
app.use('/timecards', timecardRoutes);
app.use('/jobs', jobRoutes);

// ✅ Add this test route to confirm it's live
app.get('/test', (req, res) => {
    res.send('✅ AES Backend is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));