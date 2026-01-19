const pool = require('../config/db');

// Ensure the table exists (This is a basic check, ideally migrations should be used)
const createEventTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        last_date_reg VARCHAR(255) NOT NULL,
        reg_link VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
        await pool.query(query);
        console.log("Events table checked/created");
    } catch (error) {
        console.error("Error creating events table:", error);
    }
};

createEventTable();

const getAllEvents = async (req, res) => {
    try {
        const [events] = await pool.query('SELECT * FROM events ORDER BY id DESC'); // Order by newest first
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEvent = async (req, res) => {
    const { name, date, venue, category, last_date_reg, reg_link } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO events (name, date, venue, category, last_date_reg, reg_link) VALUES (?, ?, ?, ?, ?, ?)',
            [name, date, venue, category, last_date_reg, reg_link]
        );
        res.status(201).json({ id: result.insertId, name, date, venue, category, last_date_reg, reg_link });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, venue, category, last_date_reg, reg_link } = req.body;
    try {
        await pool.query(
            'UPDATE events SET name = ?, date = ?, venue = ?, category = ?, last_date_reg = ?, reg_link = ? WHERE id = ?',
            [name, date, venue, category, last_date_reg, reg_link, id]
        );
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM events WHERE id = ?', [id]);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
