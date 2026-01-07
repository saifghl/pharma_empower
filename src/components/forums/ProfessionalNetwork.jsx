import React, { useState } from 'react';
import './Forums.css';

import { Link } from 'react-router-dom';

const NetworkCard = ({ icon, title, description, link, linkText, isHighlight, isRegister }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`network-option-card ${isHighlight ? 'highlight-card' : ''} ${isRegister ? 'register-card' : ''}`}>
            <div className="card-header-icon">{icon}</div>
            <h3>
                {title}
                {title === 'Expert Engagement' && <span className="new-tag-small">New</span>}
            </h3>

            <p className={`card-description ${isExpanded ? 'expanded' : 'clamped'}`}>
                {description}
            </p>

            <button className="read-more-btn" onClick={toggleExpand}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>

            <Link to={link} className="network-link">{linkText}</Link>
        </div>
    );
};

const ProfessionalNetwork = () => {
    return (
        <div className="network-page-single">
            <div className="network-layout">
                {/* TOP HERO PANEL */}
                <div className="network-hero-panel">
                    <h1>Professional Network</h1>
                    <p className="network-subtitle tagline-animate">
                        Learn, connect, and stay compliant in one place
                    </p>
                    <div className="network-hero-divider"></div>
                    <p className="network-description">
                        Join a community of future leaders and industry experts.
                    </p>
                </div>

                {/* BOTTOM: CONTENT GRID */}
                <div className="network-content-panel">
                    <div className="network-options-grid">
                        <NetworkCard
                            icon="💬"
                            title="Pharma Forums"
                            description="Post your toughest challenge and get validated solutions from peers and verified industry experts. Private & compliant peer-to-peer exchange."
                            link="/login"
                            linkText="Go to Forums →"
                        />

                        <NetworkCard
                            icon="📅"
                            title="Events"
                            description="Discover upcoming conferences, exhibitions, seminars, and trainings in one place. Stay updated with the latest industry gatherings."
                            link="/login"
                            linkText="See Upcoming Events →"
                            isHighlight={true}
                        />

                        <NetworkCard
                            icon="🏆"
                            title="Expert Engagement"
                            description="Exclusive Q&A sessions with veteran Project Managers discussing complex topics like Agile in Pharma or PMP best practices in a regulated environment."
                            link="/login"
                            linkText="View Calendar →"
                        />

                        <NetworkCard
                            icon="🤝"
                            title="Career Counseling"
                            description="Book private sessions with industry leaders to strategize your next career move. Get personalized advice from mentors who have walked the path."
                            link="/session"
                            linkText="Book Session →"
                        />

                        <NetworkCard
                            icon="🔓"
                            title="Login / Register"
                            description="Inclusive access empowering every professional to grow without barriers. Your growth, our priority. Join us today."
                            link="/register"
                            linkText="Get Free Access →"
                            isRegister={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalNetwork;
