const pool = require('../config/db');

/* GET ALL USERS */
const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT id, full_name, email, role, is_blocked FROM users'
        );
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* UPDATE ROLE */
const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        await pool.query(
            'UPDATE users SET role = ? WHERE id = ?',
            [role, id]
        );
        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* 🔒 BLOCK / UNBLOCK USER */
const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { is_blocked } = req.body;

    try {
        await pool.query(
            'UPDATE users SET is_blocked = ? WHERE id = ?',
            [is_blocked, id]
        );
        res.json({
            message: is_blocked ? 'User blocked successfully' : 'User unblocked successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    updateUserStatus
};
