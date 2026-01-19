import React, { useState } from 'react';
import './EmpowerTechAI.css';

const EmpowerTechAI = () => {

  // CMS LOGIC
  const [headerContent, setHeaderContent] = useState({
    title: 'Empower – Tech & AI',
    subtitle: 'Enabling the future of healthcare through technology, innovation, and artificial intelligence.',
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80'
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('site_full_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.empower) {
        setHeaderContent(prev => ({ ...prev, ...parsed.empower.hero }));
      }
    }
  }, []);

  return (
    <div className="empower-wrapper">

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${headerContent.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1>{headerContent.title}</h1>
        <p>{headerContent.subtitle}</p>
      </div>

      {/* SKILL BOARD
      <div className="content-section">
        <h2>Dynamic Skill Board</h2>

        <div className="skill-grid">
          <div className="skill-card">AI & Machine Learning</div>
          <div className="skill-card">Data Analytics</div>
          <div className="skill-card">Cloud Platforms</div>
          <div className="skill-card">Digital Pharma</div>
          <div className="skill-card">Automation</div>
          <div className="skill-card">Cybersecurity</div>
        </div>
      </div> */}

      {/* EMERGING TECHNOLOGIES
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
      </div> */}

      {/* AI SECTION */}
      <div className="content-section">
        <h2>Artificial Intelligence</h2>

        <p className="ai-text">
          Artificial Intelligence is transforming the pharmaceutical
          industry by enabling faster discovery, smarter operations,
          and better patient outcomes.
        </p>

        <div className="ai-box">
          AI Animation / Video Area
        </div>
      </div>

    </div>
  );
};

export default EmpowerTechAI;
