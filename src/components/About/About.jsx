import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import PrinciplesSection from './PrinciplesSection';

import './About.css';

const About = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <HeroSection />
      <PrinciplesSection />
      
    </div>
  );
};

export default About;

