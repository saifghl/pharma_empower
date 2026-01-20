const pool = require("../config/db");

// CREATE SESSION (Book session)
exports.createSession = async (req, res) => {
    console.log("create session function is running here");
    console.log("Request body:", req.body);
    console.log("request userId", req.user.userId);
    try {
        const { fullName, phone, topic, date } = req.body;
        console.log(fullName, phone, topic, date);

        // Basic validation
        if (!fullName || !phone || !topic || !date) {
            return res.status(400).json({ error: "All fields (fullName, phone, topic, date) are required" });
        }

        const sql = `
            INSERT INTO sessions 
            (user_id, full_name, phone, topic, session_date) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.execute(sql, [req.user.userId, fullName, phone, topic, date]);

        res.status(201).json({ message: "Session created successfully" });
    } catch (error) {
        console.error("DB ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// GET ALL SESSIONS (Admin)
exports.getAllSessions = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                id,
                user_id,
                full_name,
                phone,
                topic,
                DATE_FORMAT(session_date, '%d %b %Y') AS session_date,
                DATE_FORMAT(created_at, '%d %b %Y %h:%i %p') AS created_at
            FROM sessions
            ORDER BY created_at DESC
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Failed to fetch sessions:", error);
        res.status(500).json({ message: "Failed to fetch sessions" });
    }
};

// DELETE SESSION (Admin)
exports.deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM sessions WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.json({ message: "Session deleted successfully" });
    } catch (error) {
        console.error("Failed to delete session:", error);
        res.status(500).json({ message: "Failed to delete session" });
    }
};