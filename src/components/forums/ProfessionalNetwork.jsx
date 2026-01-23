import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forums.css';
import { cmsAPI } from '../../services/api'; // ✅ ADD THIS

/* =======================
   NETWORK CARD
======================= */
const NetworkCard = ({
    icon,
    title,
    description,
    onClick,
    linkText,
    isHighlight = false,
    isRegister = false
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`network-option-card ${isHighlight ? 'highlight-card' : ''} ${isRegister ? 'register-card' : ''}`}>
            <div className="card-header-icon">{icon}</div>

            <h3>
                {title}
                {title === 'Expert Engagement' && (
                    <span className="new-tag-small">New</span>
                )}
            </h3>

            <p className={`card-description ${isExpanded ? 'expanded' : 'clamped'}`}>
                {description}
            </p>

            <button
                className="read-more-btn"
                onClick={() => setIsExpanded(p => !p)}
            >
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>

            <button className="network-link" onClick={onClick}>
                {linkText}
            </button>
        </div>
    );
};

/* =======================
   MAIN PAGE
======================= */
const ProfessionalNetwork = () => {
    const navigate = useNavigate();

    const [headerContent, setHeaderContent] = useState({
        title: 'Professional Network',
        subtitle: 'Connect with peers, mentors, and industry leaders.',
        bgImage:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80'
    });

    // ✅ FETCH CMS FROM BACKEND
    useEffect(() => {
        cmsAPI.getPage('network')
            .then(res => {
                setHeaderContent(prev => ({
                    ...prev,
                    ...res.data.hero
                }));
            })
            .catch(() => {
                console.warn('Network CMS not found, using defaults');
            });
    }, []);

    /* 🔑 LOGIN REDIRECT HANDLER */
    const requireLogin = (targetPath) => {
        const isLoggedIn = localStorage.getItem('token');

        if (!isLoggedIn) {
            navigate('/login', {
                state: { from: targetPath }
            });
        } else {
            navigate(targetPath);
        }
    };

    return (
        <div className="network-page-single">
            <div className="network-layout">

                <div
                    className="network-hero-panel"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(10,45,82,.9), rgba(10,45,82,.8)),
                            url(${headerContent.bgImage})
                        `
                    }}
                >
                    <h1>{headerContent.title}</h1>
                    <p className="network-subtitle">{headerContent.subtitle}</p>
                </div>

                <div className="network-content-panel">
                    <div className="network-options-grid">

                        <NetworkCard
                            icon="💬"
                            title="Pharma Forums"
                            description="Validated expert discussions."
                            onClick={() => requireLogin('/forums')}
                            linkText="Go to Forums →"
                        />

                        <NetworkCard
                            icon="📅"
                            title="Events"
                            description="Industry events & conferences."
                            onClick={() => requireLogin('/events')}
                            linkText="See Events →"
                            isHighlight
                        />

                        <NetworkCard
                            icon="🏆"
                            title="Expert Engagement"
                            description="Live expert Q&A."
                            onClick={() => requireLogin('/calendar')}
                            linkText="View Calendar →"
                        />

                        <NetworkCard
                            icon="🤝"
                            title="Career Counseling"
                            description="Private mentoring sessions."
                            onClick={() => requireLogin('/session')}
                            linkText="Book Session →"
                        />

                        <NetworkCard
                            icon="🔓"
                            title="Login / Register"
                            description="Join the community."
                            onClick={() => navigate('/register')}
                            linkText="Get Free Access →"
                            isRegister
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalNetwork;
