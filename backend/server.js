
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
// ✅ start cron jobs
require("./services/pharmaNewsCron");


// Import routes
const authRoutes = require('./routes/authRoutes');

const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const newsRoutes = require("./routes/newsRoutes");
const sessionRoutes = require("./routes/sessionRoutes")
// Import database
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });


// Routes

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});