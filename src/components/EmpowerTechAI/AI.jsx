import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleAnimation from './ParticleAnimation';
import './EmpowerTechAI.css';

const EmpowerTechAI = () => {
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            label: "Drug Discovery",
            title: "Accelerating Molecule Identification",
            content: "AI algorithms analyze vast chemical libraries to predict molecule behavior, significantly reducing the time required to identify promising drug candidates from years to months."
        },
        {
            label: "Clinical Trials",
            title: "Optimizing Patient Selection",
            content: "Machine learning models identify ideal patient populations for trials, ensuring better diversity and higher success rates while reducing recruitment time."
        },
        {
            label: "Manufacturing",
            title: "Predictive Maintenance",
            content: "AI monitors manufacturing equipment in real-time to predict failures before they happen, ensuring zero downtime and consistent drug quality."
        }
    ];

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

            <div className="hero-section ai-hero">
                <div className="hero-content-glass">
                    <h1>
                        <span className="hero-main">Empower</span>
                        <span className="hero-sub">Tech & AI</span>
                    </h1>
                    <p>
                        Enabling the future of healthcare through technology,
                        innovation, and artificial intelligence.
                    </p>
                </div>
            </div>
            <div className="content-section">

                {/* STATS */}
                <div className="tech-stats-grid">
                    <div className="tech-stat-card">
                        <h3>50%</h3>
                        <p>Faster Discovery</p>
                    </div>
                    <div className="tech-stat-card">
                        <h3>99%</h3>
                        <p>Accuracy Rate</p>
                    </div>
                    <div className="tech-stat-card">
                        <h3>24/7</h3>
                        <p>Process Monitoring</p>
                    </div>
                </div>

                <div className="tech-intro">
                    <p style={{ marginBottom: '30px' }}>
                        Artificial Intelligence is transforming the pharmaceutical
                        industry by enabling faster discovery, smarter operations,
                        and better patient outcomes.
                    </p>
                </div>

                {/* TABS CONTAINER */}
                <div className="tech-tabs-container">
                    <div className="tech-tabs-header">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`tech-tab-btn ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="tech-tab-content">
                        <h3>{tabs[activeTab].title}</h3>
                        <p>{tabs[activeTab].content}</p>
                    </div>
                </div>

                <div className="ai-box" style={{ position: 'relative', overflow: 'hidden' }}>
                    <ParticleAnimation />
                </div>
            </div>

        </div>
    );
};

export default EmpowerTechAI;
