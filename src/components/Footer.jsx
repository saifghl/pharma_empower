import React from 'react';
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
                {/* Top part of footer main - Logo or other links if kept, but user focused on "end of footer" layout. 
            We will keep the logo/links but restructure the bottom part as requested. 
            Actually, based on "end of footer should look like this", I should probably split the bottom bar.
        */}

                <div className="footer-content-top">
                    <div className="footer-logo">
                        PHARMA EMPOWER SOLUTIONS
                    </div>
                    <ul className="footer-links-main">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#programs">Training Programs</a></li>
                        <li><a href="#consulting">Consulting</a></li>
                        {/* Contact removed as requested */}
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
                        <a href="#privacy">Privacy Policy</a>
                        <span className="separator">•</span>
                        <a href="#terms">Terms of Service</a>
                        <span className="separator">•</span>
                        <a href="#cookie">Cookie Policy</a>
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
