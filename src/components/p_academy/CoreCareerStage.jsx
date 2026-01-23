import React from 'react';
import './CoreCareerStage.css';

const CoreCareerStage = () => {
    return (
        <section className="career-section">
            <div className="career-container">
                <h2 className="career-title">Core Career Stage</h2>
                <h3 className="career-tagline">Clear Guidance & Growth Strategies for Your Journey</h3>

                <p className="career-description">
                    Navigating a career in the pharmaceutical industry requires a strategic approach. We break down the journey into four distinct stages to help you identify where you stand and what you need to advance.
                </p>

                <div className="career-content-block">
                    <p className="career-description">
                        <strong>1. Foundational / Entry Level:</strong> For Trainees and Junior Officers. The focus is on mastering fundamentals like
                        <span className="highlight-text"> SOPs</span>, <span className="highlight-text"> GMP</span>, and building technical competence.
                    </p>
                    <p className="career-description">
                        <strong>2. Core / Mid-Level:</strong> For Executives and Assistant Managers. Transition to leading small teams, mastering
                        <span className="highlight-text"> Process Validation</span>, and managing Quality Management Systems.
                    </p>
                    <p className="career-description">
                        <strong>3. Advanced / Senior Level:</strong> For Managers and DGMs. Driving departmental strategies,
                        <span className="highlight-text"> Resource Management</span>, and ensuring cross-functional compliance.
                    </p>
                    <p className="career-description">
                        <strong>4. Strategic / Executive Level:</strong> For VPs and Directors. Shaping organizational vision, navigating
                        <span className="highlight-text"> Global Compliance</span>, and driving innovation.
                    </p>
                </div>

                <p className="career-description" style={{ marginTop: '30px' }}>
                    <strong>Growth Strategies:</strong> Accelerate your path through
                    <span className="highlight-text"> Continuous Learning</span>,
                    <span className="highlight-text"> Strategic Networking</span>, and
                    <span className="highlight-text"> Skill Diversification</span>.
                </p>
            </div>
        </section>
    );
};

export default CoreCareerStage;
