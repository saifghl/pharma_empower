import React, { useState } from 'react';

const CMSManager = () => {
    const [selectedPage, setSelectedPage] = useState('home');

    // --- MOCK STATE FOR ALL PAGES ---
    const [homeData, setHomeData] = useState({
        heroTitle: 'Empowering Pharma Professionals Globally',
        heroSubtitle: 'Bridging the gap between academia and industry with cutting-edge training.',
        missionText: 'To provide world-class education and certification that translates directly to career advancement.'
    });

    const [aboutData, setAboutData] = useState({
        mission: 'Our mission is to standardize pharma skills globally.',
        vision: 'To be the world leading platform for pharma upskilling.',
        values: 'Integrity, Innovation, Excellence.'
    });

    const [intelligenceData, setIntelligenceData] = useState({
        headline: 'Latest Industry Insights',
        newsSource: 'Curated from top pharma journals.'
    });

    const [techData, setTechData] = useState({
        mainTitle: 'Empower Tech & AI',
        aiSectionTitle: 'Artificial Intelligence in Drug Discovery',
        emergingTechTitle: 'Pharma 4.0 Technologies'
    });

    const [academyData, setAcademyData] = useState({
        introText: 'Our programs are learner designed, learner driven and learner focused.',
        stage1Title: 'Foundational Career Stage',
        stage2Title: 'Core Career Stage',
        stage3Title: 'Strategic Leadership Stage'
    });

    const [networkData, setNetworkData] = useState({
        heroTitle: 'Professional Network: Forums & Executive Connect',
        forumDesc: 'Post your toughest challenge and get validated solutions.',
        meetupDesc: 'Exclusive Q&A sessions with veteran Project Managers.'
    });

    const [skillBoardData, setSkillBoardData] = useState({
        title: 'Pharma & Healthcare Skill Board',
        subtitle: 'Your single access point for high-impact pharma jobs.'
    });

    const [contactData, setContactData] = useState({
        address: '123 Pharma Way, Innovation City',
        email: 'contact@pharmaempower.com',
        phone: '+1 (555) 123-4567'
    });


    const handleSave = (e) => {
        e.preventDefault();
        alert(`Changes for "${selectedPage.toUpperCase()}" saved successfully! (Frontend Demo)`);
    };

    return (
        <div className="admin-page">
            <header className="admin-page-header">
                <h1>Website Content Manager</h1>
                <p>Edit text and content across the platform.</p>
            </header>

            <div className="cms-control-panel">
                <label><strong>Select Page to Edit:</strong></label>
                <select
                    className="page-selector"
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                >
                    <option value="home">Home Page</option>
                    <option value="about">About Us</option>
                    <option value="intelligence">Intelligence Hub</option>
                    <option value="tech">Empower Tech & AI</option>
                    <option value="academy">Pharma Empower Academy</option>
                    <option value="network">Professional Network</option>
                    <option value="skillboard">Skill Board</option>
                    <option value="contact">Contact Us</option>
                </select>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSave}>

                    {/* --- HOME PAGE --- */}
                    {selectedPage === 'home' && (
                        <div className="cms-form-section">
                            <h3>Home Page Content</h3>
                            <div className="form-group">
                                <label>Hero Section Title</label>
                                <input type="text" value={homeData.heroTitle} onChange={(e) => setHomeData({ ...homeData, heroTitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Hero Subtitle</label>
                                <textarea value={homeData.heroSubtitle} onChange={(e) => setHomeData({ ...homeData, heroSubtitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Mission Statement</label>
                                <textarea value={homeData.missionText} onChange={(e) => setHomeData({ ...homeData, missionText: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- ABOUT US --- */}
                    {selectedPage === 'about' && (
                        <div className="cms-form-section">
                            <h3>About Us Content</h3>
                            <div className="form-group">
                                <label>Our Mission</label>
                                <textarea value={aboutData.mission} onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Our Vision</label>
                                <textarea value={aboutData.vision} onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Our Values</label>
                                <textarea value={aboutData.values} onChange={(e) => setAboutData({ ...aboutData, values: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- INTELLIGENCE HUB --- */}
                    {selectedPage === 'intelligence' && (
                        <div className="cms-form-section">
                            <h3>Intelligence Hub Content</h3>
                            <div className="form-group">
                                <label>Page Headline</label>
                                <input type="text" value={intelligenceData.headline} onChange={(e) => setIntelligenceData({ ...intelligenceData, headline: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>News Data Source Description</label>
                                <input type="text" value={intelligenceData.newsSource} onChange={(e) => setIntelligenceData({ ...intelligenceData, newsSource: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- EMPOWER TECH & AI --- */}
                    {selectedPage === 'tech' && (
                        <div className="cms-form-section">
                            <h3>Empower Tech & AI Content</h3>
                            <div className="form-group">
                                <label>Main Page Title</label>
                                <input type="text" value={techData.mainTitle} onChange={(e) => setTechData({ ...techData, mainTitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>AI Section Title</label>
                                <input type="text" value={techData.aiSectionTitle} onChange={(e) => setTechData({ ...techData, aiSectionTitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Emerging Technologies Title</label>
                                <input type="text" value={techData.emergingTechTitle} onChange={(e) => setTechData({ ...techData, emergingTechTitle: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- ACADEMY --- */}
                    {selectedPage === 'academy' && (
                        <div className="cms-form-section">
                            <h3>Pharma Academy Content</h3>
                            <div className="form-group">
                                <label>Introduction Text</label>
                                <textarea value={academyData.introText} onChange={(e) => setAcademyData({ ...academyData, introText: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Stage 1 Title (Foundational)</label>
                                <input type="text" value={academyData.stage1Title} onChange={(e) => setAcademyData({ ...academyData, stage1Title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Stage 2 Title (Core)</label>
                                <input type="text" value={academyData.stage2Title} onChange={(e) => setAcademyData({ ...academyData, stage2Title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Stage 3 Title (Leadership)</label>
                                <input type="text" value={academyData.stage3Title} onChange={(e) => setAcademyData({ ...academyData, stage3Title: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- PROFESSIONAL NETWORK --- */}
                    {selectedPage === 'network' && (
                        <div className="cms-form-section">
                            <h3>Professional Network Content</h3>
                            <div className="form-group">
                                <label>Hero Title</label>
                                <input type="text" value={networkData.heroTitle} onChange={(e) => setNetworkData({ ...networkData, heroTitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Pharma Forums Description</label>
                                <textarea value={networkData.forumDesc} onChange={(e) => setNetworkData({ ...networkData, forumDesc: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Connect/Meetup Description</label>
                                <textarea value={networkData.meetupDesc} onChange={(e) => setNetworkData({ ...networkData, meetupDesc: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- SKILL BOARD --- */}
                    {selectedPage === 'skillboard' && (
                        <div className="cms-form-section">
                            <h3>Skill Board Content</h3>
                            <div className="form-group">
                                <label>Board Title</label>
                                <input type="text" value={skillBoardData.title} onChange={(e) => setSkillBoardData({ ...skillBoardData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Subtitle / Intro</label>
                                <textarea value={skillBoardData.subtitle} onChange={(e) => setSkillBoardData({ ...skillBoardData, subtitle: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* --- CONTACT US --- */}
                    {selectedPage === 'contact' && (
                        <div className="cms-form-section">
                            <h3>Contact Us Details</h3>
                            <div className="form-group">
                                <label>Physical Address</label>
                                <input type="text" value={contactData.address} onChange={(e) => setContactData({ ...contactData, address: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Contact Email</label>
                                <input type="email" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" value={contactData.phone} onChange={(e) => setContactData({ ...contactData, phone: e.target.value })} />
                            </div>
                        </div>
                    )}

                    <div className="form-actions" style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CMSManager;
