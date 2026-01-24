const express = require('express');
const router = express.Router();
const pool = require('../config/db');

/* ================= USER: CREATE REQUEST ================= */
router.post('/requests', async (req, res) => {
    const { user_id, booking_date, booking_type, notes } = req.body;

    if (!user_id || !booking_date || !booking_type) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await pool.execute(
            `INSERT INTO calendar_requests 
             (user_id, booking_date, booking_type, notes)
             VALUES (?, ?, ?, ?)`,
            [user_id, booking_date, booking_type, notes || '']
        );

        res.status(201).json({ message: 'Calendar request submitted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/* ================= ADMIN: GET ALL REQUESTS ================= */
router.get('/admin/requests', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT cr.*, u.full_name, u.email
            FROM calendar_requests cr
            JOIN users u ON cr.user_id = u.id
            ORDER BY cr.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/* ================= ADMIN: UPDATE STATUS ================= */
router.put('/admin/update-status', async (req, res) => {
    const { id, status } = req.body;

    if (!id || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        await pool.execute(
            `UPDATE calendar_requests SET status = ? WHERE id = ?`,
            [status, id]
        );
        res.json({ message: 'Status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
/* ================= USER: GET OWN BOOKINGS ================= */
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            `SELECT booking_date, booking_type, status
             FROM calendar_requests
             WHERE user_id = ?
             ORDER BY booking_date ASC`,
            [id]
        );

        res.json(rows); // ✅ MUST RETURN JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
});


module.exports = router;
