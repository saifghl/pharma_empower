import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleAnimation from './ParticleAnimation';
import './EmpowerTechAI.css';

const EmpowerTechAI = () => {
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    if (!isLoggedIn) {
        return (
            <div className="empower-login-container">
                <div className="empower-login-card">
                    <h2>Empower Tech & AI</h2>
                    <p>Artificial Intelligence in Pharma</p>
                    <Link to="/login" className="empower-login-btn">
                        Login to Access AI Insights
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
            <div className="content-section">
                <h2>Artificial Intelligence</h2>

                <p className="ai-text">
                    Artificial Intelligence is transforming the pharmaceutical
                    industry by enabling faster discovery, smarter operations,
                    and better patient outcomes.
                </p>

                <div className="ai-box" style={{ position: 'relative', overflow: 'hidden' }}>
                    <ParticleAnimation />
                </div>
            </div>

        </div>
    );
};

export default EmpowerTechAI;
