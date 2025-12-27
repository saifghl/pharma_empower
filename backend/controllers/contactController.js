const pool = require('../config/db');

exports.createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, organization_need, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        await pool.query(
            `INSERT INTO contact_messages 
             (name, email, subject, organization_need, message)
             VALUES (?, ?, ?, ?, ?)`,
            [name, email, subject, organization_need || null, message]
        );

        res.status(201).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message' });
    }
};