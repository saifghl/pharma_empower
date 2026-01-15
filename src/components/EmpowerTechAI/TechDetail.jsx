import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmpowerTechAI.css';
import Navbar from '../navbar';

const TechDetail = ({ title, subtitle, description, heroColor, tabs, stats }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    if (!isLoggedIn) {
        return (
            <>
                <div className="empower-login-container">
                    <div className="empower-login-card">
                        <h2>{title}</h2>
                        <p>Login to access detailed insights about {title}</p>
                        <Link to="/login" className="empower-login-btn">
                            Login into Pharma Empower
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="empower-wrapper">
            {/* HERO SECTION */}
            <div className="hero-section" style={{ background: heroColor }}>
                <div className="hero-content-glass">
                    <h1>
                        <span className="hero-main">Empower</span>
                        <span className="hero-sub">{title}</span>
                    </h1>
                    <p>{subtitle}</p>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="content-section">

                {/* INTRO */}
                <div className="tech-intro">
                    <p>{description}</p>
                </div>

                {/* ANIMATED STATS */}
                {stats && (
                    <div className="tech-stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="tech-stat-card">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* INTERACTIVE TABS */}
                {tabs && (
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
                )}


                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <Link to="/empower/emerging-tech" className="et-hero-btn" style={{ background: '#071D49' }}>
                        Back to Technologies
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default TechDetail;
