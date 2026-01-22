import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
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
      await authAPI.register(formData);

      alert('Registration successful. Please login.');
      navigate('/login');

    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <div className="login-header-section">
            <h2>Create Account</h2>
            <p>Register to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-global">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

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

            <button type="submit" className="login-submit-btn">
              Register
            </button>
          </form>

          <div className="login-footer-section">
            <p>
              Already have an account?
              <button
                type="button"
                className="toggle-btn"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
