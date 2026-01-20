const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const [enqRows] = await pool.query(
            `SELECT COUNT(*) AS totalEnquiries FROM contact_messages`
        );

        const [todayRows] = await pool.query(
            `SELECT COUNT(*) AS todayEnquiries
             FROM contact_messages
             WHERE DATE(created_at) = CURDATE()`
        );

        const [studentRows] = await pool.query(
            `SELECT COUNT(*) AS activeStudents
             FROM users
             WHERE role = 'user'`
        );

        const [sessionRows] = await pool.query(
            `SELECT COUNT(*) AS totalSessions FROM sessions`
        );

        res.status(200).json({
            totalEnquiries: enqRows[0]?.totalEnquiries || 0,
            todayEnquiries: todayRows[0]?.todayEnquiries || 0,
            activeStudents: studentRows[0]?.activeStudents || 0,
            totalSessions: sessionRows[0]?.totalSessions || 0
        });

    } catch (error) {
        console.error("🔥 Dashboard Error:", error);
        res.status(500).json({ message: 'Failed to load dashboard stats' });
    }
};
