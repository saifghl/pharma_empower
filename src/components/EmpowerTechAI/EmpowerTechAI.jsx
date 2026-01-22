import React, { useState, useEffect } from 'react';
import './EmpowerTechAI.css';
import { cmsAPI } from '../../services/api'; // ✅ ADD THIS

const EmpowerTechAI = () => {

  // CMS LOGIC
  const [headerContent, setHeaderContent] = useState({
    title: 'Empower – Tech & AI',
    subtitle: 'Enabling the future of healthcare through technology, innovation, and artificial intelligence.',
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80'
  });

  // ✅ FETCH FROM BACKEND CMS
  useEffect(() => {
    cmsAPI.getPage('empower')
      .then(res => {
        setHeaderContent(prev => ({
          ...prev,
          ...res.data.hero
        }));
      })
      .catch(() => {
        console.warn('Empower CMS not found, using default content');
      });
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
