import React, { useEffect, useState } from 'react';
import { Rocket, Heart, Target, ChevronRight } from 'lucide-react';
import Principles from './Principles';
import Mission from './Mission';
import Value from './Value';
import Purpose from './Purpose';
import './About.css';

const About = () => {

  // ... (existing state and openModal logic remains same)

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (type) => {
    setActiveModal(type);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="about-landing">

      {/* =========================
          HERO TAGLINE
      ========================== */}
      <div className="about-hero">
        <h1 className="about-tagline fade-in-up">
          Empowering people through <br />
          <span className="highlight-text">
            open knowledge
          </span>
        </h1>
      </div>

      {/* =========================
          OUR PRINCIPLES (CENTERED)
      ========================== */}
      <div className="about-principles-container fade-in-up delay-1">
        <Principles />
      </div>

      {/* =========================
          CTA NAV BUTTONS
      ========================== */}
      <div className="about-nav-container fade-in-up delay-2">

        <div className="about-nav-card" onClick={() => openModal('mission')}>
          <div className="card-icon-wrapper">
            <Rocket size={32} />
          </div>
          <div className="card-content">
            <h3>Our Mission</h3>
            <span className="card-subtext">Accelerating Talent</span>
          </div>
          <ChevronRight className="nav-arrow" size={20} />
        </div>

        <div className="about-nav-card" onClick={() => openModal('values')}>
          <div className="card-icon-wrapper">
            <Heart size={32} />
          </div>
          <div className="card-content">
            <h3>Our Values</h3>
            <span className="card-subtext">Integrity & Respect</span>
          </div>
          <ChevronRight className="nav-arrow" size={20} />
        </div>

        <div className="about-nav-card" onClick={() => openModal('purpose')}>
          <div className="card-icon-wrapper">
            <Target size={32} />
          </div>
          <div className="card-content">
            <h3>Our Purpose</h3>
            <span className="card-subtext">Equitable Access</span>
          </div>
          <ChevronRight className="nav-arrow" size={20} />
        </div>

      </div>

      {/* ... (Modal code remains same) ... */}


      {/* =========================
          MODAL OVERLAY
      ========================== */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>

            <div className="modal-body">

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
