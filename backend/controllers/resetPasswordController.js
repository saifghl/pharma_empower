const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const [users] = await pool.execute(
      'SELECT id FROM users WHERE reset_token=? AND reset_token_expiry > NOW()',
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.execute(
      `UPDATE users 
       SET password=?, reset_token=NULL, reset_token_expiry=NULL 
       WHERE id=?`,
      [hashed, users[0].id]
    );

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = resetPassword;
