import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { authAPI } from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginAs: 'user' // ✅ UI only
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      console.log('LOGIN RESPONSE 👉', res.data);

      // ✅ SAVE AUTH DATA
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('isLoggedIn', 'true');

      // ✅ ROLE FROM BACKEND (NOT DROPDOWN)
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      console.error(err);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <div className="login-header-section">
            <h2>Welcome Back</h2>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-global">

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {/* ✅ LOGIN AS (UI ONLY) */}
            <div className="form-group">
              <label>Login As</label>
              <select
                name="loginAs"
                value={formData.loginAs}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>
          </form>

          <div className="login-footer-section">
            <p>
              Don’t have an account?
              <button
                type="button"
                className="toggle-btn"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
