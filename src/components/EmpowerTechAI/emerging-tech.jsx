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
                    <p>Explore Revolutionary Technologies</p>
                    <Link to="/login" className="empower-login-btn">
                        Login to Access Emerging Tech
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
            {/* EMERGING TECHNOLOGIES */}
            <div className="content-section light-bg">
                <h2>Emerging Technologies in Pharma</h2>

                <div className="tech-cards">
                    <div className="tech-card">
                        <h3>Peptides</h3>
                        <p>Targeted therapies improving precision treatment.</p>
                    </div>

                    <div className="tech-card">
                        <h3>Devices</h3>
                        <p>Smart devices for monitoring and diagnostics.</p>
                    </div>

                    <div className="tech-card">
                        <h3>mRNA</h3>
                        <p>Revolutionizing vaccines and therapeutics.</p>
                    </div>

                    <div className="tech-card">
                        <h3>Personalized Medicine</h3>
                        <p>Data-driven treatments tailored to individuals.</p>
                    </div>

                    <div className="tech-card">
                        <h3>Artificial Intelligence</h3>
                        <p>Accelerating research and clinical decisions.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default EmpowerTechAI;