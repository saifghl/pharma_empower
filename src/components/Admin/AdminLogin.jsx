import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // Reusing admin styles

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // HARDCODED CREDENTIALS FOR DEMO
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            localStorage.setItem('adminToken', 'secure_token_123');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Try admin / admin123');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h2>Admin Panel Access</h2>
                <p>Please log in to manage the website.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
