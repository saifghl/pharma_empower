import React, { useEffect } from 'react';
import Mission from './Mission';
import Value from './Value';

import './About.css';

const About = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <Mission />
      <Value />

    </div>
  );
};

export default About;

