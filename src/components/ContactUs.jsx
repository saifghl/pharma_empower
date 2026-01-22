import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import { contactAPI, cmsAPI } from '../services/api'; // ✅ added cmsAPI

const ContactUs = () => {

    // CMS CONTENT STATE (same structure, no UI change)
    const [pageContent, setPageContent] = useState({
        hero: {
            title: 'Ready to Connect',
            subtitle: "We’re here to support your career growth and your organization's operational needs.",
            bgImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80'
        },
        info: {
            email: 'Info@pharmaempower.com',
            phone: '+1 (555) 123-4567',
            address: '123 Pharma Way, Innovation City, PC 54321'
        }
    });

    // ✅ FETCH FROM CMS (DATABASE)
    useEffect(() => {
        cmsAPI.getPage('contact')
            .then(res => {
                setPageContent(prev => ({
                    hero: { ...prev.hero, ...res.data.hero },
                    info: { ...prev.info, ...res.data.info }
                }));
            })
            .catch(err => {
                console.warn('CMS Contact page not found, using defaults');
            });
    }, []);

    // CONTACT FORM STATE
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
                organization_need: formData.organizationalNeed, // ✅ backend match
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

            <div
                className="contact-header"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pageContent.hero.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '4rem 2rem'
                }}
            >
                <h1>{pageContent.hero.title}</h1>
                <p>{pageContent.hero.subtitle}</p>
            </div>

            <div className="contact-info-bar" style={{ textAlign: 'center', padding: '2rem 0', background: '#f7fafc' }}>
                <p>
                    <strong>Email:</strong> {pageContent.info.email}
                    &nbsp;|&nbsp;
                    <strong>Phone:</strong> {pageContent.info.phone}
                </p>
                <p><strong>Address:</strong> {pageContent.info.address}</p>
            </div>

            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>

                    {error && <p className="error-text">{error}</p>}

                    <div className="form-group">
                        <label>Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Subject *</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
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
