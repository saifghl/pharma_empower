import React, { useState } from 'react';
import { adminAuthAPI } from '../../services/api';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      await adminAuthAPI.changePassword({
        currentPassword,
        newPassword,
      });

      setMessage('✅ Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(
        err.response?.data?.message || '❌ Failed to update password'
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Inline styles for visibility
  const cardStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: loading ? '#ccc' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '16px',
  };

  const messageStyle = {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '14px',
    color: message.includes('❌') ? 'red' : 'green',
  };

  return (
    <div style={cardStyle}>
      <h2>Change Admin Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default ChangePassword;
