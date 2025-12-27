import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { authAPI } from '../../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res=await authAPI.login(formData)
        if(res.data){
           localStorage.setItem('isLoggedIn', 'true');
            
           // Store token and user data
           localStorage.setItem('token', res.data.token);
           localStorage.setItem('user', JSON.stringify(res.data.user));
         
           // Redirect based on role
          if (res.data.user.role === 'admin') {
           navigate('/admin/dashboard');
          }
           else{ 
            navigate("/")
           }
           
        }}catch(err){
           console.log(err.message);
        }
  
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header-section">
                        <h2>Welcome Back</h2>
                        <p>Enter your details to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form-global">
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
                            Sign In
                        </button>
                    </form>

                    <div className="login-footer-section">
                        <p>
                            Don't have an account?
                            <button type="button" className="toggle-btn" onClick={() => navigate('/register')}>
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
