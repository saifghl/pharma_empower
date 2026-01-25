const pool = require('../config/db');

/* ================= USER: CREATE REQUEST ================= */
/* ================= USER: CREATE REQUEST ================= */
exports.createRequest = async (req, res) => {
  const { booking_date, booking_type, notes, user_id } = req.body;

  // ✅ support both authenticated & non-auth flow
  const finalUserId = req.user?.id || user_id;

  if (!finalUserId || !booking_date || !booking_type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await pool.execute(
      `INSERT INTO calendar_requests 
       (user_id, booking_date, booking_type, notes, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [
        finalUserId,
        booking_date,
        booking_type,
        notes || ''
      ]
    );

    res.status(201).json({ message: 'Booking request submitted' });
  } catch (err) {
    console.error('CREATE REQUEST ERROR:', err);
    res.status(500).json({ message: 'Failed to create request' });
  }
};


/* ================= ADMIN: GET ALL REQUESTS ================= */
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        cr.id,
        cr.booking_date,
        cr.booking_type,
        cr.notes,
        cr.status,
        cr.session_time,
        cr.meeting_link,
        cr.created_at,
        u.full_name,
        u.email
      FROM calendar_requests cr
      LEFT JOIN users u ON cr.user_id = u.id
      ORDER BY cr.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load requests' });
  }
};

/* ================= ADMIN: UPDATE STATUS + TIME + LINK ================= */
exports.updateStatus = async (req, res) => {
  const { id, status, session_time, meeting_link } = req.body;

  if (!id || !['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    await pool.execute(
      `UPDATE calendar_requests 
       SET 
         status = ?, 
         session_time = ?, 
         meeting_link = ?
       WHERE id = ?`,
      [
        status,
        status === 'approved' ? session_time : null,
        status === 'approved' ? meeting_link : null,
        id
      ]
    );

    res.json({ message: 'Request updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

/* ================= USER: GET OWN REQUESTS ================= */
exports.getUserRequests = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT 
         booking_date,
         booking_type,
         notes,
         status,
         session_time,
         meeting_link,
         created_at
       FROM calendar_requests
       WHERE user_id = ?
       ORDER BY created_at ASC`,
      [id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

/* ================= CALENDAR: APPROVED BOOKINGS ================= */
exports.getApprovedBookings = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
         booking_date,
         booking_type,
         session_time,
         meeting_link
       FROM calendar_requests
       WHERE status = 'approved'`
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load approved bookings' });
  }
};
