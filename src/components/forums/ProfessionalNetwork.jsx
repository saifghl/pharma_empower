import React, { useState } from 'react';
import './Forums.css';

import { Link } from 'react-router-dom';

const ProfessionalNetwork = () => {
    return (
        <div className="network-dashboard">
            <header className="network-hero">
                <div className="hero-content">
                    <h1>Professional Network: Forums & Executive Connect</h1>
                    <p className="hero-sub">The Global Peer-to-Peer Knowledge Exchange</p>

                    <Link to="/login" className="hero-login-btn-network">
                        Login to Join Network
                    </Link>
                </div>
            </header>

            <main className="network-main">

                {/* Pharma Forums Section */}
                <section className="network-section forums-section">
                    <div className="section-header">
                        <h2>Pharma Forums</h2>
                        <span className="section-badge">Peer-to-Peer Exchange</span>
                    </div>
                    <div className="content-card">
                        <h3>Post your toughest challenge and get validated solutions from peers and verified industry experts.</h3>
                        <p>
                            Our forums are where future leaders discuss real-world implementation issues—from QMS rollouts to managing multi-site tech transfers.
                            Our private, moderated forums ensure discussions are compliant, focused, and immediately actionable.
                        </p>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="icon">🔒</span>
                                <div>
                                    <strong>Private & Compliant</strong>
                                    <span>Moderated discussions to ensure safety and quality.</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="icon">⚡</span>
                                <div>
                                    <strong>Actionable Insights</strong>
                                    <span>Solutions you can implement immediately.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Connect & Meetup Section */}
                <section className="network-section connect-section">
                    <div className="section-header">
                        <h2>Connect & Meetup</h2>
                        <span className="section-badge">Executive Access</span>
                    </div>

                    <div className="grid-2-col">
                        <div className="content-card blue-card">
                            <h3>Counseling</h3>
                            <p>
                                Book a private session to strategize your career move.
                                Get personalized advice from industry leaders who have walked the path.
                            </p>
                            <Link to="/login" className="action-link-btn">Book a Session &rarr;</Link>
                        </div>

                        <div className="content-card navy-card">
                            <h3>Expert Engagement <span className="new-tag">New</span></h3>
                            <p>
                                Exclusive Q&A sessions with veteran Project Managers discussing complex topics like Agile in Pharma or PMP best practices in a regulated environment.
                            </p>
                            <Link to="/login" className="action-link-btn">View Session Calendar &rarr;</Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="network-cta">
                    <h2>Ready to engage with the best?</h2>
                    <Link to="/login" className="cta-btn-large">Join the Conversation</Link>
                </section>

            </main>
        </div>
    );
};

export default ProfessionalNetwork;
