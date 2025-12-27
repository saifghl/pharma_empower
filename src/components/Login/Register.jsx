import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response=await authAPI.register(formData)
        if(response.data){
               // Redirect to login page
             navigate('/login');
        }}catch(err){
            console.log(err.message);
        }
    
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header-section">
                        <h2>Create Account</h2>
                        <p>Join us to unlock exclusive content</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form-global">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
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
                            <button type="button" className="toggle-btn" onClick={() => navigate('/login')}>
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
