import React from 'react';
import './Glance.css';

const Glance = () => {
    return (
        <section className="glance-section">
            <div className="glance-container">
                <h2 className="glance-title">Glance of Pharma World</h2>
                <h3 className="glance-tagline">A Beginner-Friendly Overview of the Pharmaceutical Industry</h3>

                <p className="glance-description">
                    The pharmaceutical industry is a complex yet fascinating ecosystem dedicated to discovering, developing, and delivering life-saving medicines. It bridges the gap between scientific innovation and patient care.
                </p>

                <p className="glance-description">
                    <strong>Key Departments:</strong> The industry relies on specialized functions working in harmony:
                    <span className="highlight-text"> Research & Development (R&D)</span> for innovation,
                    <span className="highlight-text"> Production</span> for manufacturing,
                    <span className="highlight-text"> Quality Assurance (QA/QC)</span> for safety standards, and
                    <span className="highlight-text"> Regulatory Affairs</span> for compliance.
                    Together with Sales, Marketing, and Supply Chain, they ensure medicines reach those in need.
                </p>

                <p className="glance-description">
                    <strong>Career Pathways:</strong> Opportunities exist at every level. From
                    <span className="highlight-text"> Entry-Level</span> roles for fresh graduates to
                    <span className="highlight-text"> Mid-Level</span> management and
                    <span className="highlight-text"> Senior Leadership</span> positions, the industry offers a structured ladder for growth and development.
                </p>

                <p className="glance-description">
                    <strong>Future Trends:</strong> The sector is rapidly evolving with
                    <span className="highlight-text"> Personalized Medicine</span>,
                    <span className="highlight-text"> AI in Drug Discovery</span>, and
                    <span className="highlight-text"> Digital Health</span> solutions shaping the future of healthcare.
                </p>
            </div>
        </section>
    );
};

export default Glance;
