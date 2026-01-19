import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            {/* Flash News Ticker */}
            <div className="news-ticker-bar">
                <div className="ticker-content">
                    <span className="ticker-item">
                        <span className="ticker-label">Pharma Pulse:</span>
                        USFDA Issues New Guidance on Data Integrity for Cloud-Based Systems.
                    </span>
                    <span className="ticker-item">
                        <span className="ticker-label">Clinical Update:</span>
                        Gene Therapy Shows Promising Phase II Results for Oncology.
                    </span>
                    <span className="ticker-item">
                        <span className="ticker-label">Upcoming Event:</span>
                        Webinar: Decoding USFDA's Latest Guidelines on Cleaning Validation. Register Now!
                    </span>
                    <span className="ticker-item">
                        <span className="ticker-label">Pharma Pulse:</span>
                        Stay Ahead of the Curve with Pharma Empower Solutions.
                    </span>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-content-top">
                    <div className="footer-logo">
                        PHARMA EMPOWER SOLUTIONS
                    </div>
                    <ul className="footer-links-main">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/academy">Training Programs</Link></li>
                        <li><Link to="/contact-us">Consulting</Link></li>
                        <li className="footer-contact-item">
                            <span style={{ color: '#ffffff' }}>Contact: </span>
                            <a href="mailto:Info@pharmaempower.com" className="footer-email-link">Info@pharmaempower.com</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-separator"></div>

                {/* new bottom section matching image */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p>&copy; {new Date().getFullYear()} Pharma Empower Solutions. All rights reserved.</p>
                        <p className="tagline-small">Empowering Pharma Professionals Globally</p>
                    </div>

                    <div className="footer-bottom-right">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        {/* <span className="separator">•</span> */}
                        {/* <a href="#terms">Terms of Service</a>
                        <span className="separator">•</span>
                        <a href="#cookie">Cookie Policy</a> */}
                    </div>
                </div>

                <div className="footer-powered-by">
                    Powered by Prenaya
                </div>

            </div>
        </footer>
    );
};

export default Footer;
