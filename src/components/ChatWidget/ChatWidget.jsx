import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Send, CheckCircle } from 'lucide-react';
import { communityAPI } from '../../services/api';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ask');
    const [formData, setFormData] = useState({ name: '', query: '' });
    const [submitted, setSubmitted] = useState(false);

    // Logic-only states
    const [qaList, setQaList] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ================= LOAD PUBLIC Q&A ================= */
    useEffect(() => {
        if (activeTab === 'qa') {
            fetchQA();
        }
    }, [activeTab]);

    const fetchQA = async () => {
        try {
            setLoading(true);
            const res = await communityAPI.getQA();
            setQaList(res.data || []);
        } catch (error) {
            console.error('Failed to load Q&A', error);
        } finally {
            setLoading(false);
        }
    };

    /* ================= FORM HANDLING ================= */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ================= SUBMIT QUESTION ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.query.trim()) {
            alert('Question is required');
            return;
        }

        try {
            await communityAPI.askQuestion({
                name: formData.name || 'Anonymous',
                query: formData.query, // ✅ MUST MATCH BACKEND
            });

            setSubmitted(true);
            setFormData({ name: '', query: '' });

            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error('Question submit failed', error);
            alert('Failed to submit question. Please try again.');
        }
    };

    return (
        <div className="chat-widget-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Community Support</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chat-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'ask' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ask')}
                        >
                            Ask a Question
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                            onClick={() => setActiveTab('qa')}
                        >
                            Public Q&A
                        </button>
                    </div>

                    <div className="chat-content">
                        {/* ================= ASK TAB ================= */}
                        {activeTab === 'ask' && (
                            submitted ? (
                                <div className="success-message">
                                    <CheckCircle size={48} color="#28a745" />
                                    <p>Your question has been sent to our admin team!</p>
                                    <button
                                        className="submit-btn"
                                        onClick={() => setSubmitted(false)}
                                        style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                                    >
                                        Ask another
                                    </button>
                                </div>
                            ) : (
                                <form className="ask-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name (Optional)"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="query"
                                            placeholder="What would you like to ask?"
                                            required
                                            value={formData.query}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="submit-btn">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            Send Query <Send size={16} />
                                        </div>
                                    </button>
                                </form>
                            )
                        )}

                        {/* ================= PUBLIC Q&A TAB ================= */}
                        {activeTab === 'qa' && (
                            <div className="qa-list">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : qaList.length === 0 ? (
                                    <p>No public questions yet.</p>
                                ) : (
                                    qaList.map(item => (
                                        <div key={item.id} className="qa-card">
                                            <div className="qa-question">
                                                <strong>{item.user_name} asks:</strong>
                                                <p>{item.question}</p>
                                            </div>
                                            {item.answer && (
                                                <div className="qa-answer">
                                                    <strong>Admin Answer:</strong>
                                                    <p>{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;
