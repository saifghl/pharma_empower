import React from 'react';
import './UpskillResources.css';

const UpskillResources = () => {
    return (
        <section className="upskill-section">
            <div className="upskill-container">
                <h2 className="upskill-title">Upskill Resources</h2>
                <h3 className="upskill-tagline">Career Guidance & Growth Strategies</h3>

                <p className="upskill-description">
                    Get clear career guidance and growth strategies for every stage of your pharma journey. Identify skill gaps, explore roles, and plan your career progression with confidence.
                </p>

                <p className="upskill-description">
                    We provide curated resources to help you master new technologies, understand regulatory changes, and develop the soft skills necessary for leadership.
                </p>

                <div className="upskill-content-block">
                    <p className="upskill-description">
                        <strong>Identify Skill Gaps:</strong> Assess your current competencies against industry standards.
                    </p>
                    <p className="upskill-description">
                        <strong>Explore Roles:</strong> Discover new career paths within the diverse pharmaceutical ecosystem.
                    </p>
                    <p className="upskill-description">
                        <strong>Plan Progression:</strong> Create a roadmap to achieve your professional goals.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default UpskillResources;
