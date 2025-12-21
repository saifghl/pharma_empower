import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">
                        Pharma Empower
                    </a>
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={isMobileMenuOpen ? "hamburger open" : "hamburger"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={isMobileMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <div className="navbar-center">
                        <ul className="nav-links">
                            <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About Us</Link></li>
                            <li><a href="/#int-hub" className="nav-link" onClick={toggleMenu}>Intelligence Hub</a></li>
                            <li><Link to="/empower-tech-ai" className="nav-link" onClick={toggleMenu}>Empower Tech & AI</Link></li>
                            <li><Link to="/academy" className="nav-link" onClick={toggleMenu}>Pharma Empower Academy</Link></li>
                            <li><Link to="/network" className="nav-link" onClick={toggleMenu}>Professional Network</Link></li>
                            {/* Mobile specific Contact Link */}
                            <li className="mobile-only"><Link to="/contact-us" className="nav-link" onClick={toggleMenu}>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="navbar-right">
                        <ul className="utility-links">
                            <li className="desktop-only"><Link to="/contact-us" className="utility-link contact-btn">Contact Us</Link></li>
                            <li className="desktop-only"><a href="#global" className="utility-link">GLOBAL</a></li>
                            <li className="desktop-only"><a href="#search" className="utility-link">🔍</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
