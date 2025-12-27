const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');



// Import routes
const authRoutes = require('./routes/authRoutes');


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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // ✅ NOW correct

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


