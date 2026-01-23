import React, { useState, useEffect } from 'react';
import './PharmaAcademy.css';
import { Link } from 'react-router-dom';
import { cmsAPI } from '../../services/api'; // ✅ ADD

const PharmaAcademy = () => {

    // CMS LOGIC
    const [headerContent, setHeaderContent] = useState({
        title: 'Pharma Academy',
        subtitle: 'Structured upskilling for sustainable pharma careers',
        bgImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80'
    });

    // ✅ FETCH FROM BACKEND CMS
    useEffect(() => {
        cmsAPI.getPage('academy')
            .then(res => {
                setHeaderContent(prev => ({
                    ...prev,
                    ...res.data.hero
                }));
            })
            .catch(() => {
                console.warn('Academy CMS not found, using default content');
            });
    }, []);

    return (
        <div className="academy-page">

            {/* HERO SECTION */}
            <header
                className="academy-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${headerContent.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="hero-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                </div>

                <h1>{headerContent.title}</h1>
                <p className="hero-subtext tagline-animate">{headerContent.subtitle}</p>
                <div className="academy-hero-divider"></div>

                <Link to="/login" className="hero-login-btn">
                    Login to Enroll / Access Courses
                </Link>

            </header>

            {/* INTRO SECTION */}
            <section className="academy-intro-text">
                <p>
                    As people development specialists, the emphasis is always on people. Our programs are learner designed, learner driven and learner focused.
                    We get results because we pay attention to what our clients need. We aim to deliver a positive experience that empowers the individual,
                    while creating a thirst for knowledge and a hunger for further learning.
                </p>
                <p>
                    Driven by a true enthusiasm for learning, our trainers and facilitators constantly up-skill themselves, ensuring that Empower courses maintain the highest possible standards.
                </p>
                <p>
                    Pharma Empower Solutions (PES) are committed to helping people achieve specific, tangible, measurable results.
                    We understand that individuals will have specific desired learning outcomes from our courses so we try to ensure that each person is
                    equipped with a tailored practical plan of action that can be implemented after the course.
                    We believe in providing a full service, which is why our clients find our aftercare service every bit as satisfying as the experience on our programmes.
                </p>
            </section>

            {/* CAREER STAGES */}
            <section className="career-stages-section">
                <h2 className="section-title">Our Progressive Career Stages</h2>

                <div className="stages-grid">
                    {/* Stage 1 */}
                    <div className="stage-card blue-border">
                        <div className="stage-header">
                            <span className="stage-num">1.</span>
                            <h3>Foundational Career Stage</h3>
                            <span className="stage-role">Beginners & Recent Graduates</span>
                        </div>
                        <p className="stage-desc">
                            Master the fundamental GxP compliance, regulatory standards, and essential process management skills needed to enter the industry.
                        </p>
                        <div className="stage-details">
                            <h4>Key Focus Areas:</h4>
                            <ul>
                                <li>Basic GxP/Compliance & Audits</li>
                                <li>Process Validation (VMPs, Protocols)</li>
                                <li>Regulatory Filing Basics (CTD/eCTD)</li>
                                <li>Introduction to Quality Management Systems (QMS)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="stage-card purple-border">
                        <div className="stage-header">
                            <span className="stage-num">2.</span>
                            <h3>Core Career Stage</h3>
                            <span className="stage-role">Managers & Senior Professionals</span>
                        </div>
                        <p className="stage-desc">
                            Focus on specialized skills in AI in Drug Discovery, Pharma 4.0, advanced regulatory affairs, and critical project management.
                        </p>
                        <div className="stage-details">
                            <h4>Key Focus Areas:</h4>
                            <ul>
                                <li>AI in Drug Discovery (Gene Therapy)</li>
                                <li>Pharma 4.0 & Digital Tools</li>
                                <li>Advanced Regulatory Strategy (USFDA/EMA)</li>
                                <li>Data Integrity & Cloud Compliance</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="stage-card green-border">
                        <div className="stage-header">
                            <span className="stage-num">3.</span>
                            <h3>Strategic Leadership Stage</h3>
                            <span className="stage-role">Executives & Directors</span>
                        </div>
                        <p className="stage-desc">
                            Develop executive-level strategies covering AI roadmaps, ethical compliance, investment modeling, and global data privacy.
                        </p>
                        <div className="stage-details">
                            <h4>Key Focus Areas:</h4>
                            <ul>
                                <li>AI Strategy & Roadmap Development</li>
                                <li>Ethical AI & Bias Mitigation</li>
                                <li>Digital Transformation Leadership</li>
                                <li>Investment & ROI Modeling for AI/Robotics</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PharmaAcademy;
