import React, { useState, useEffect } from 'react';
import { Save, Globe, Star, Plus, Trash2, Image as ImageIcon, Type } from 'lucide-react';
import './ContentManagement.css';
import { cmsAPI } from '../../services/api';

/* ================= DEFAULT FALLBACK ================= */
const DEFAULT_CONTENT = {
    home: {
        hero: {
            title: 'Empowering the Future of Pharmacy',
            subtitle: 'Connect, Learn, and Grow with the leading platform for pharmaceutical professionals.',
            ctaText: 'Get Started',
            bgImage: ''
        },
        highlights: []
    },
    about: {
        hero: { title: '', subtitle: '', bgImage: '' },
        details: { mission: '', vision: '' }
    },
    academy: { hero: { title: '', subtitle: '', bgImage: '' } },
    empower: { hero: { title: '', subtitle: '', bgImage: '' } },
    network: { hero: { title: '', subtitle: '', bgImage: '' } },
    contact: {
        hero: { title: '', subtitle: '', bgImage: '' },
        info: { email: '', phone: '', address: '' }
    }
};

const ContentManagement = () => {
    const [selectedPage, setSelectedPage] = useState('home');
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [isLoading, setIsLoading] = useState(false);

    /* ================= LOAD PAGE CONTENT ================= */
    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const res = await cmsAPI.getPage(selectedPage);

                setContent(prev => ({
                    ...prev,
                    [selectedPage]: {
                        ...prev[selectedPage],
                        ...res.data,
                        hero: {
                            ...prev[selectedPage].hero,
                            ...(res.data?.hero || {})
                        }
                    }
                }));
            } catch (err) {
                console.warn(`Using default content for ${selectedPage}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [selectedPage]);

    /* ================= SAVE ================= */
    const handleSave = async () => {
        try {
            await cmsAPI.updatePage(selectedPage, content[selectedPage]);
            alert('Content updated successfully ✅');
        } catch (err) {
            alert('Failed to save content ❌');
        }
    };

    /* ================= UPDATE FIELD ================= */
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

    /* ================= HIGHLIGHTS ================= */
    const [newHighlight, setNewHighlight] = useState({ title: '', description: '' });

    const addHighlight = (e) => {
        e.preventDefault();
        setContent(prev => ({
            ...prev,
            home: {
                ...prev.home,
                highlights: [
                    ...(prev.home.highlights || []),
                    { id: Date.now(), ...newHighlight }
                ]
            }
        }));
        setNewHighlight({ title: '', description: '' });
    };

    const deleteHighlight = (id) => {
        setContent(prev => ({
            ...prev,
            home: {
                ...prev.home,
                highlights: prev.home.highlights.filter(h => h.id !== id)
            }
        }));
    };

    const hero = content[selectedPage]?.hero || {};

    return (
        <div className="content-management-container">
            <div className="cms-header">
                <h2>Site Content Manager</h2>
                <p>Edit content across all public pages.</p>
            </div>

            {/* PAGE SELECTOR */}
            <div className="page-selector-bar">
                <label><Globe size={18} /> Select Page:</label>
                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                >
                    {Object.keys(DEFAULT_CONTENT).map(p => (
                        <option key={p} value={p}>{p.toUpperCase()}</option>
                    ))}
                </select>

                <button onClick={handleSave} disabled={isLoading}>
                    <Save size={18} /> {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>

            {/* HERO EDITOR */}
            <div className="cms-section">
                <h3><ImageIcon size={20} /> Hero Section</h3>
                <input
                    value={hero.title || ''}
                    onChange={e => updateField('hero', 'title', e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={hero.subtitle || ''}
                    onChange={e => updateField('hero', 'subtitle', e.target.value)}
                    placeholder="Subtitle"
                />
                <input
                    value={hero.bgImage || ''}
                    onChange={e => updateField('hero', 'bgImage', e.target.value)}
                    placeholder="Background Image URL"
                />
            </div>

            {/* HOME HIGHLIGHTS */}
            {selectedPage === 'home' && (
                <div className="cms-section">
                    <h3><Star size={20} /> Highlights</h3>

                    <form onSubmit={addHighlight}>
                        <input
                            placeholder="Title"
                            value={newHighlight.title}
                            onChange={e => setNewHighlight({ ...newHighlight, title: e.target.value })}
                        />
                        <input
                            placeholder="Description"
                            value={newHighlight.description}
                            onChange={e => setNewHighlight({ ...newHighlight, description: e.target.value })}
                        />
                        <button type="submit"><Plus size={16} /> Add</button>
                    </form>

                    {(content.home.highlights || []).map(h => (
                        <div key={h.id} className="highlight-item">
                            <span>{h.title} — {h.description}</span>
                            <button onClick={() => deleteHighlight(h.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
