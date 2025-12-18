import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">
                        Pharma Empower
                    </a>
                </div>

                <div className="navbar-center">
                    <ul className="nav-links">
                        <li><a href="#about" className="nav-link active">About Us</a></li>
                        <li><a href="#int-hub" className="nav-link">Intelligence Hub</a></li>
                        <li><a href="#empower-ai" className="nav-link">Empower Tech & AI</a></li>
                        <li><a href="#pharma-academy" className="nav-link">Pharma Empower Academy</a></li>
                        <li><a href="#professional-network" className="nav-link">Professional Network</a></li>
                    </ul>
                </div>

                <div className="navbar-right">
                    <ul className="utility-links">
                        <li><a href="#contact-us" className="utility-link">Contact Us</a></li>
                        <li><a href="#global" className="utility-link">GLOBAL</a></li>
                        <li><a href="#search" className="utility-link">SEARCH</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
