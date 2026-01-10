const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const adminAuth = require('../middleware/adminAuth'); // ✅ ADD THIS

// ✅ Admin dashboard stats (protected)
router.get('/', adminAuth, getDashboardStats);

module.exports = router;
