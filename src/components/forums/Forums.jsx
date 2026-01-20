import React, { useState, useEffect } from 'react';
import './Forums.css'; // Reusing existing CSS
import { communityAPI } from '../../services/api';

const Forums = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ name: '', query: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchquestions();
    }, []);

    const fetchquestions = async () => {
        try {
            const res = await communityAPI.getQA();
            setQuestions(res.data);
        } catch (error) {
            console.error("Failed to load questions", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAsk = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await communityAPI.askQuestion(newQuestion);
            setMessage({ type: 'success', text: 'Question submitted! It will appear after approval.' });
            setNewQuestion({ name: '', query: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to submit question.' });
        } finally {
            setSubmitting(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <div className="forums-page">
            {/* HER0 SECTION */}
            <div className="network-hero-panel" style={{
                backgroundImage: `linear-gradient(rgba(10,45,82,.9), rgba(10,45,82,.8)), url(https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80)`,
                padding: '60px 20px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1>Pharma Forums</h1>
                <p>Expert discussions and community Q&A.</p>
            </div>

            <div className="forums-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* ASK BOX */}
                <div className="ask-box" style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
                    <h3>Ask a Question</h3>
                    {message && <div className={`msg-${message.type}`} style={{ color: message.type === 'success' ? 'green' : 'red', marginBottom: '10px' }}>{message.text}</div>}

                    <form onSubmit={handleAsk}>
                        <div style={{ display: 'grid', gap: '15px', maxWidth: '600px' }}>
                            <input
                                placeholder="Your Name (Optional)"
                                value={newQuestion.name}
                                onChange={e => setNewQuestion({ ...newQuestion, name: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <textarea
                                placeholder="What's your question?"
                                value={newQuestion.query}
                                onChange={e => setNewQuestion({ ...newQuestion, query: e.target.value })}
                                required
                                rows={3}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <button type="submit" disabled={submitting} className="submit-btn" style={{
                                padding: '12px 24px',
                                background: '#0a2d52',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: 'fit-content'
                            }}>
                                {submitting ? 'Submitting...' : 'Submit Question'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* QUESTIONS LIST */}
                <div className="qa-list">
                    <h3 style={{ marginBottom: '20px', borderBottom: '2px solid #00adef', display: 'inline-block' }}>Recent Discussions</h3>

                    {isLoading ? <p>Loading discussions...</p> : (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {questions.length === 0 ? <p>No questions yet. Be the first to ask!</p> : questions.map(q => (
                                <div key={q.id} className="qa-card" style={{
                                    padding: '20px',
                                    border: '1px solid #eee',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    background: 'white'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ color: '#0a2d52', fontSize: '1.1rem' }}>{q.question}</strong>
                                        <span style={{ fontSize: '0.9rem', color: '#666' }}>By {q.user_name || 'Anonymous'}</span>
                                    </div>
                                    <div style={{ background: '#f0f7ff', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#00adef', marginRight: '5px' }}>Answer:</span>
                                        {q.answer || 'Waiting for expert response...'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Forums;
