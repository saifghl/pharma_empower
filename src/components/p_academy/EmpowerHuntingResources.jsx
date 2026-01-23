import React from 'react';
import './EmpowerHuntingResources.css';

const EmpowerHuntingResources = () => {
    return (
        <section className="hunting-section">
            <div className="hunting-container">
                <h2 className="hunting-title">Empower Hunting Resources</h2>
                <h3 className="hunting-tagline">Find Your Next Opportunity</h3>

                <p className="hunting-description">
                    A dedicated space to help learners and professionals find the right job opportunities in the pharmaceutical sector. We have curated a list of reliable job portals and networking platforms tailored for pharma and healthcare roles.
                </p>

                <div className="hunting-content-block">
                    <p className="hunting-description">
                        <strong>Recommended Job Platforms:</strong>
                    </p>
                    <ul className="hunting-list">
                        <li><span className="platform-name">LinkedIn:</span> The premier professional networking site. Essential for connecting with recruiters and industry leaders.</li>
                        <li><span className="platform-name">Naukri:</span> A leading job portal heavily used by Indian pharma companies for all levels.</li>
                        <li><span className="platform-name">Indeed:</span> A global job search engine that aggregates listings from thousands of websites.</li>
                        <li><span className="platform-name">Glassdoor:</span> Excellent for company reviews, salary insights, and job listings.</li>
                        <li><span className="platform-name">Company Career Pages:</span> Always check the official career pages of major pharma companies (e.g., Sun Pharma, Cipla, Dr. Reddy's) for direct openings.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default EmpowerHuntingResources;
