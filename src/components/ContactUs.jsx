import React, { useState } from 'react';
import './ContactUs.css';
import { contactAPI } from '../services/api'; // ✅ correct path

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        organizationalNeed: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await contactAPI.sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                organization_need: formData.organizationalNeed, // ✅ FIX
                message: formData.message
            });

            alert('Thank you for contacting us! We will get back to you soon.');

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                organizationalNeed: ''
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Ready to Connect</h1>
                <p>We’re here to support your career growth and your organization's operational needs.</p>
            </div>

            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>

                    {error && <p className="error-text">{error}</p>}

                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject *</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Organizational Need (Optional)</label>
                        <input
                            type="text"
                            name="organizationalNeed"
                            value={formData.organizationalNeed}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Message *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ContactUs;