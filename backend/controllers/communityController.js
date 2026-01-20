const pool = require('../config/db');

// USER → Ask a question
exports.createQuestion = async (req, res) => {
    try {
        const { name, query } = req.body;

        if (!query) {
            return res.status(400).json({ message: 'Question is required' });
        }

        await pool.query(
            `INSERT INTO community_questions (user_name, question)
             VALUES (?, ?)`,
            [name || 'Anonymous', query]
        );

        res.status(201).json({ message: 'Question submitted successfully' });

    } catch (error) {
        console.error('Community Ask Error:', error);
        res.status(500).json({ message: 'Failed to submit question' });
    }
};

// USER → Public Q&A
exports.getPublicQA = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, user_name, question, answer
             FROM community_questions
             WHERE status = 'answered'
             ORDER BY created_at DESC`
        );

        res.status(200).json(rows);

    } catch (error) {
        console.error('Public QA Error:', error);
        res.status(500).json({ message: 'Failed to load Q&A' });
    }
};
