import React, { useState, useEffect } from 'react';
import { Save, Globe, Star, Plus, Trash2, Image as ImageIcon, Type } from 'lucide-react';
import './ContentManagement.css';

// Default content configuration for fallback
const DEFAULT_CONTENT = {
    home: {
        hero: {
            title: 'Empowering the Future of Pharmacy',
            subtitle: 'Connect, Learn, and Grow with the leading platform for pharmaceutical professionals.',
            ctaText: 'Get Started',
            bgImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80'
        },
        highlights: []
    },
    about: {
        hero: {
            title: 'About Us',
            subtitle: 'Dedicated to advancing the pharmaceutical profession through innovation and community.',
            bgImage: 'https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80'
        },
        details: {
            mission: 'To empower every pharma professional with the tools and knowledge they need.',
            vision: 'A connected global community driving healthcare forward.'
        }
    },
    academy: {
        hero: {
            title: 'Pharma Academy',
            subtitle: 'World-class education and training for the modern pharmacist.',
            bgImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80'
        }
    },
    empower: {
        hero: {
            title: 'Empower Tech AI',
            subtitle: 'Leveraging Artificial Intelligence to revolutionize pharma tech.',
            bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80'
        }
    },
    network: {
        hero: {
            title: 'Professional Network',
            subtitle: 'Connect with peers, mentors, and industry leaders.',
            bgImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80'
        }
    },
    contact: {
        hero: {
            title: 'Contact Us',
            subtitle: 'We are here to help. Reach out to us anytime.',
            bgImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80'
        },
        info: {
            email: 'support@pharmaempower.com',
            phone: '+1 (555) 123-4567',
            address: '123 Pharma Way, Innovation City, PC 54321'
        }
    }
};

const ContentManagement = () => {
    const [selectedPage, setSelectedPage] = useState('home');
    const [content, setContent] = useState(DEFAULT_CONTENT);

    // Load all content from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('site_full_content');
        if (saved) {
            setContent({ ...DEFAULT_CONTENT, ...JSON.parse(saved) });
        }
    }, []);

    // Save specific page changes
    const handleSave = () => {
        localStorage.setItem('site_full_content', JSON.stringify(content));
        alert(`${selectedPage.toUpperCase()} content updated successfully!`);
    };

    const updateField = (section, field, value) => {
        setContent(prev => ({
            ...prev,
            [selectedPage]: {
                ...prev[selectedPage],
                [section]: {
                    ...prev[selectedPage][section],
                    [field]: value
                }
            }
        }));
    };

    // Highlights Specific Logic (Home Page Only)
    const [newHighlight, setNewHighlight] = useState({ title: '', description: '' });
    const addHighlight = (e) => {
        e.preventDefault();
        const currentHighlights = content.home.highlights || [];
        const updated = [...currentHighlights, { id: Date.now(), ...newHighlight }];

        setContent(prev => ({
            ...prev,
            home: { ...prev.home, highlights: updated }
        }));
        setNewHighlight({ title: '', description: '' });
    };

    const deleteHighlight = (id) => {
        const currentHighlights = content.home.highlights || [];
        const updated = currentHighlights.filter(h => h.id !== id);
        setContent(prev => ({
            ...prev,
            home: { ...prev.home, highlights: updated }
        }));
    };

    const renderHeroEditor = () => (
        <div className="cms-section">
            <h3><ImageIcon size={20} /> Hero Section Banner</h3>
            <div className="cms-form-grid">
                <div className="form-group full-width">
                    <label>Page Title</label>
                    <input
                        value={content[selectedPage].hero.title}
                        onChange={(e) => updateField('hero', 'title', e.target.value)}
                    />
                </div>
                <div className="form-group full-width">
                    <label>Subtitle / Slogan</label>
                    <textarea
                        rows="2"
                        value={content[selectedPage].hero.subtitle}
                        onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                    />
                </div>
                <div className="form-group full-width">
                    <label>Background Image URL</label>
                    <input
                        value={content[selectedPage].hero.bgImage}
                        onChange={(e) => updateField('hero', 'bgImage', e.target.value)}
                    />
                </div>
                {selectedPage === 'home' && (
                    <div className="form-group">
                        <label>CTA Button Text</label>
                        <input
                            value={content.home.hero.ctaText}
                            onChange={(e) => updateField('hero', 'ctaText', e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className="preview-box"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${content[selectedPage].hero.bgImage})`
                }}>
                <div className="preview-content">
                    <h4>{content[selectedPage].hero.title}</h4>
                    <p>{content[selectedPage].hero.subtitle}</p>
                    {selectedPage === 'home' && (
                        <button className="preview-btn">{content.home.hero.ctaText}</button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="content-management-container">
            <div className="cms-header">
                <h2>Site Content Manager</h2>
                <p>Edit content across all public pages.</p>
            </div>

            {/* Page Selector */}
            <div className="page-selector-bar">
                <label><Globe size={18} /> Select Page to Edit:</label>
                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="page-select"
                >
                    <option value="home">Home Page</option>
                    <option value="about">About Us</option>
                    <option value="academy">Pharma Academy</option>
                    <option value="empower">Empower Tech AI</option>
                    <option value="network">Professional Network</option>
                    <option value="contact">Contact Us</option>
                </select>
                <button className="save-btn" onClick={handleSave}>
                    <Save size={18} /> Save {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
                </button>
            </div>

            <div className="cms-content-area">
                {/* 1. Hero Editor (Values depend on selectedPage) */}
                {renderHeroEditor()}

                {/* 2. Specific Editors */}

                {/* ABOUT SPECIFIC */}
                {selectedPage === 'about' && (
                    <div className="cms-section">
                        <h3><Type size={20} /> About Details</h3>
                        <div className="cms-form-grid">
                            <div className="form-group full-width">
                                <label>Mission Statement</label>
                                <textarea
                                    rows="3"
                                    value={content.about.details.mission}
                                    onChange={(e) => updateField('details', 'mission', e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Vision Statement</label>
                                <textarea
                                    rows="3"
                                    value={content.about.details.vision}
                                    onChange={(e) => updateField('details', 'vision', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTACT SPECIFIC */}
                {selectedPage === 'contact' && (
                    <div className="cms-section">
                        <h3><Type size={20} /> Contact Information</h3>
                        <div className="cms-form-grid">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    value={content.contact.info.email}
                                    onChange={(e) => updateField('info', 'email', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    value={content.contact.info.phone}
                                    onChange={(e) => updateField('info', 'phone', e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Physical Address</label>
                                <input
                                    value={content.contact.info.address}
                                    onChange={(e) => updateField('info', 'address', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* HOME SPECIFIC - Highlights */}
                {selectedPage === 'home' && (
                    <div className="cms-section">
                        <h3><Star size={20} /> Featured Highlights</h3>

                        <div className="add-highlight-box">
                            <h4>Add New Highlight</h4>
                            <form onSubmit={addHighlight} className="highlight-form">
                                <input
                                    placeholder="Title"
                                    value={newHighlight.title}
                                    onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                                    required
                                />
                                <input
                                    placeholder="Short Description"
                                    value={newHighlight.description}
                                    onChange={(e) => setNewHighlight({ ...newHighlight, description: e.target.value })}
                                    required
                                />
                                <button type="submit"><Plus size={18} /> Add</button>
                            </form>
                        </div>

                        <div className="highlights-list">
                            {(content.home.highlights || []).map(item => (
                                <div key={item.id} className="highlight-item">
                                    <div className="highlight-info">
                                        <strong>{item.title}</strong>
                                        <span>{item.description}</span>
                                    </div>
                                    <button onClick={() => deleteHighlight(item.id)} className="delete-icon">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
