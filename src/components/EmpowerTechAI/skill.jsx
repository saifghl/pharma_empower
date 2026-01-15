import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, X, ChevronRight, Award, TrendingUp, Layers } from 'lucide-react';
import './EmpowerTechAI.css';

const DynamicSkillBoard = () => {
    const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);

    const categories = ['All', 'Tech', 'Pharma', 'Compliance'];

    const skills = [
        {
            id: 1,
            title: "AI & Machine Learning",
            category: "Tech",
            level: "Intermediate",
            progress: 65,
            desc: "Master the basics of ML models in drug discovery.",
            tools: ["Python", "TensorFlow", "PyTorch"],
            path: "Beginner -> Data Science -> Adv ML"
        },
        {
            id: 2,
            title: "Regulatory Affairs",
            category: "Compliance",
            level: "Advanced",
            progress: 90,
            desc: "Navigate FDA/EMA guidelines for new drug approvals.",
            tools: ["eCTD", "Regulatory Intelligence"],
            path: "Associate -> Specialist -> Manager"
        },
        {
            id: 3,
            title: "Data Analytics",
            category: "Tech",
            level: "Beginner",
            progress: 30,
            desc: "Extract insights from clinical trial data.",
            tools: ["Excel", "Tableau", "SQL"],
            path: "Analyst -> Senior Analyst -> Data Lead"
        },
        {
            id: 4,
            title: "Digital Pharma Marketing",
            category: "Pharma",
            level: "Intermediate",
            progress: 55,
            desc: "Omnichannel strategies for HCP engagement.",
            tools: ["CRM", "Email Automation", "SEO"],
            path: "Marketer -> Strategist -> Digital Lead"
        },
        {
            id: 5,
            title: "Cloud Platforms",
            category: "Tech",
            level: "Advanced",
            progress: 80,
            desc: "Secure cloud architecture for healthcare data.",
            tools: ["AWS", "Azure", "S3 buckets"],
            path: "Cloud Practitioner -> Architect"
        },
        {
            id: 6,
            title: "Pharmacovigilance",
            category: "Compliance",
            level: "Beginner",
            progress: 20,
            desc: "Monitoring drug safety and adverse effects.",
            tools: ["Safety Database", "Signal Detection"],
            path: "Safety Associate -> PV Scientist"
        }
    ];

    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    if (!isLoggedIn) {
        return (
            <div className="empower-login-container">
                <div className="empower-login-card">
                    <h2>Empower Tech & AI</h2>
                    <p>Unlock the Future of Healthcare</p>
                    <Link to="/login" className="empower-login-btn">
                        Login to Access Skill Board
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="empower-wrapper">

            {/* HERO SECTION */}
            <div className="hero-section" style={{ background: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)' }}>
                <div className="hero-content-glass">
                    <h1>
                        <span className="hero-main">Skill Board</span>
                        <span className="hero-sub">Dynamic Growth</span>
                    </h1>
                    <p>Track your progress, unlock new capabilities, and stay ahead in the industry.</p>
                </div>
            </div>

            <div className="content-section">

                {/* FILTERS */}
                <div className="skill-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`skill-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* SKILL GRID */}
                <div className="skill-dashboard-grid">
                    {filteredSkills.map(skill => (
                        <div key={skill.id} className="skill-dashboard-card" onClick={() => setSelectedSkill(skill)}>
                            <div className="skill-card-header">
                                <div className={`category-badge ${skill.category.toLowerCase()}`}>{skill.category}</div>
                                {skill.progress >= 80 ? <Award className="skill-icon gold" /> : <Layers className="skill-icon" />}
                            </div>
                            <h3>{skill.title}</h3>
                            <p>{skill.desc}</p>

                            <div className="skill-progress-container">
                                <div className="progress-label">
                                    <span>{skill.level}</span>
                                    <span>{skill.progress}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: `${skill.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MODAL */}
                {selectedSkill && (
                    <div className="skill-modal-overlay" onClick={() => setSelectedSkill(null)}>
                        <div className="skill-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedSkill(null)}>
                                <X size={24} />
                            </button>

                            <h2>{selectedSkill.title}</h2>
                            <p className="modal-subtitle">{selectedSkill.desc}</p>

                            <div className="modal-section">
                                <h3><TrendingUp size={20} /> Learning Path</h3>
                                <div className="learning-path-box">
                                    {selectedSkill.path}
                                </div>
                            </div>

                            <div className="modal-section">
                                <h3><BookOpen size={20} /> Key Tools</h3>
                                <div className="tools-tags">
                                    {selectedSkill.tools.map(tool => (
                                        <span key={tool} className="tool-tag">{tool}</span>
                                    ))}
                                </div>
                            </div>

                            <button className="start-learning-btn">
                                Continue Learning <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicSkillBoard;
