const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// ✅ Start cron jobs
require("./services/pharmaNewsCron");

// Routes
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const newsRoutes = require("./routes/newsRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const communityAdminRoutes = require('./routes/communityAdminRoutes');
const pageRoutes = require('./routes/pageRoutes');

// DB
const pool = require('./config/db');

const app = express();

/* ================= ROOT HEALTH ================= */
app.get("/", (req, res) => {
    res.status(200).send("Pharma Empower Backend is running 🚀");
});

/* ================= CORS (FIXED) ================= */
const allowedOrigins = [
    'http://localhost:3000',
    'https://static-site-8s17.onrender.com'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow Postman / server-to-server
        if (!origin) return callback(null, true);

        if (allowedOrigins.some(o => origin.startsWith(o))) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ================= DB TEST ================= */
pool.getConnection()
    .then(conn => {
        console.log('✅ Database connected successfully');
        conn.release();
    })
    .catch(err => console.error('❌ DB error:', err));

/* ================= ROUTES ================= */
app.use('/api/calendar', calendarRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/admin/community', communityAdminRoutes);
app.use('/api/pages', pageRoutes);

/* ================= HEALTH ================= */
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

/* ================= 404 FALLBACK (SAFE) ================= */
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
