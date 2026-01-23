// controller/calendarController.js
exports.createRequest = async (req, res) => {
    const { booking_date, booking_type, notes } = req.body;
    const user = req.user || null; // optional for now

    try {
        await pool.execute(
            `INSERT INTO calendar_requests 
             (user_id, user_name, booking_date, booking_type, notes)
             VALUES (?, ?, ?, ?, ?)`,
            [
                user?.id || null,
                user?.full_name || 'Guest User',
                booking_date,
                booking_type,
                notes
            ]
        );

        res.status(201).json({ message: 'Booking request submitted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM calendar_requests ORDER BY created_at DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    const { id, status } = req.body; // status = approved | rejected

    try {
        await pool.execute(
            `UPDATE calendar_requests 
             SET status = ? 
             WHERE id = ?`,
            [status, id]
        );

        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getApprovedBookings = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT booking_date, booking_type 
             FROM calendar_requests 
             WHERE status = 'approved'`
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
