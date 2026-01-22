import React, { useState, useEffect } from 'react';
import { Rocket, Heart, Target, ChevronRight, Eye, X } from 'lucide-react';
import Principles from './Principles';
import Mission from './Mission';
import Value from './Value';
import Purpose from './Purpose';
import aboutHeroImg from '../../images/about_hero.png';
import './About.css';
import { cmsAPI } from '../../services/api'; // ✅ ADD THIS

const About = () => {

  const [activeModal, setActiveModal] = useState(null);

  // CMS CONTENT STATE (unchanged structure)
  const [pageContent, setPageContent] = useState({
    hero: {
      title: 'About Us',
      subtitle: 'Dedicated to advancing the pharmaceutical profession through innovation and community.',
      bgImage: 'https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80'
    },
    details: {
      mission: 'To empower every pharma professional with the tools and knowledge they need.',
      vision: 'A connected global community driving healthcare forward.'
    }
  });

  // ✅ FETCH FROM DATABASE CMS
  useEffect(() => {
    cmsAPI.getPage('about')
      .then(res => {
        setPageContent(prev => ({
          hero: { ...prev.hero, ...res.data.hero },
          details: { ...prev.details, ...res.data.details }
        }));
      })
      .catch(() => {
        console.warn('CMS About page not found, using defaults');
      });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">
        <div className="about-hero-card">
          <div className="hero-text-content">
            <h1 className="about-tagline">
              Empowering the <br />
              <span className="highlight-text">Future of Pharmacy</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '20px', lineHeight: '1.6' }}>
              {pageContent.hero.subtitle}
            </p>
          </div>
          <div className="hero-image-content">
            <img
              src={aboutHeroImg}
              alt="Pharma Empower Team"
              className="about-hero-img"
            />
          </div>
        </div>
      </div>

      {/* PRINCIPLES SECTION */}
      <div id="principles">
        <Principles />
      </div>

      {/* NAVIGATION CARDS */}
      <div className="about-nav-container">

        <div className="about-nav-card" onClick={() => setActiveModal('mission')}>
          <div className="card-icon-wrapper">
            <Target size={32} />
          </div>
          <div className="card-content">
            <h3>Our Mission</h3>
            <span className="card-subtext">Driving excellence</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="about-nav-card" onClick={() => setActiveModal('purpose')}>
          <div className="card-icon-wrapper">
            <Eye size={32} />
          </div>
          <div className="card-content">
            <h3>Our Purpose</h3>
            <span className="card-subtext">Shaping the future</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="about-nav-card" onClick={() => setActiveModal('values')}>
          <div className="card-icon-wrapper">
            <Heart size={32} />
          </div>
          <div className="card-content">
            <h3>Our Values</h3>
            <span className="card-subtext">Integrity & Impact</span>
          </div>
          <div className="nav-arrow">
            <ChevronRight size={20} />
          </div>
        </div>

      </div>

      {/* MODAL */}
      {activeModal && (
        <div className="about-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="about-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="about-modal-close" onClick={() => setActiveModal(null)}>
              <X size={24} />
            </button>
            <div className="about-modal-body">
              {activeModal === 'mission' && <Mission />}
              {activeModal === 'values' && <Value />}
              {activeModal === 'purpose' && <Purpose />}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default About;
