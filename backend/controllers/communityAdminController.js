const pool = require('../config/db');

// ADMIN → Get all pending questions
exports.getPendingQuestions = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, user_name, question, created_at
             FROM community_questions
             WHERE status = 'pending'
             ORDER BY created_at DESC`
        );

        res.json(rows);
    } catch (error) {
        console.error('Admin Fetch Error:', error);
        res.status(500).json({ message: 'Failed to load questions' });
    }
};

// ADMIN → Answer a question
exports.answerQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({ message: 'Answer is required' });
        }

        await pool.query(
            `UPDATE community_questions
             SET answer = ?, status = 'answered'
             WHERE id = ?`,
            [answer, id]
        );

        res.json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error('Admin Answer Error:', error);
        res.status(500).json({ message: 'Failed to submit answer' });
    }
};
