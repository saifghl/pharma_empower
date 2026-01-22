const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// ✅ Start cron jobs
require("./services/pharmaNewsCron");

// Routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const newsRoutes = require("./routes/newsRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');



// DB
const pool = require('./config/db');

const app = express();

/* ================= MIDDLEWARE ================= */
// ✅ Root health check (VERY IMPORTANT)
app.get("/", (req, res) => {
    res.status(200).send("Pharma Empower Backend is running 🚀");
});

// ✅ Proper CORS (LOCAL + DEPLOY)
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://pharma-empowerr.onrender.com'
    ],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
/* ================= DB TEST ================= */
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
    });

/* ================= ROUTES ================= */
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/pages', require('./routes/pageRoutes'));
app.use('/api/admin/community', require('./routes/communityAdminRoutes'));



/* ================= HEALTH CHECK ================= */
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', env: process.env.NODE_ENV || 'local' });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
