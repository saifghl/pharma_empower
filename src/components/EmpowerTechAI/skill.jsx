import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmpowerTechAI.css';

const EmpowerTechAI = () => {
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    if (!isLoggedIn) {
        return (
            <div className="empower-login-container">
                <div className="empower-login-card">
                    <h2>Empower Tech & AI</h2>
                    <p>Unlock the Future of Healthcare</p>
                    <Link to="/login" className="empower-login-btn">
                        Login to Access Skill Board
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="empower-wrapper">

            {/* HERO SECTION */}
            <div className="hero-section">
                <h1>Empower – Tech & AI</h1>
                <p>
                    Enabling the future of healthcare through technology,
                    innovation, and artificial intelligence.
                </p>
            </div>

            {/* SKILL BOARD */}
            <div className="content-section">
                <h2>Dynamic Skill Board</h2>

                <div className="skill-grid">
                    <div className="skill-card">AI & Machine Learning</div>
                    <div className="skill-card">Data Analytics</div>
                    <div className="skill-card">Cloud Platforms</div>
                    <div className="skill-card">Digital Pharma</div>
                    <div className="skill-card">Automation</div>
                    <div className="skill-card">Cybersecurity</div>
                </div>
            </div>
        </div>
    );
};

export default EmpowerTechAI;
