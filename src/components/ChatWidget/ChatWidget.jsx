import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle } from 'lucide-react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ask'); // 'ask' or 'qa'
    const [formData, setFormData] = useState({ name: '', query: '' });
    const [submitted, setSubmitted] = useState(false);

    // Mock data for Public Q&A
    const mockQA = [
        {
            id: 1,
            user: "Sarah J.",
            question: "How do I certify for the advanced pharma course?",
            answer: "You can apply for certification after completing all module quizzes with a score of 80% or higher. Visit your dashboard to track progress."
        },
        {
            id: 2,
            user: "Mike T.",
            question: "Is financial aid available for students?",
            answer: "Yes, we offer scholarships for eligible students. Please check our 'Scholarships' page under the Resources section for more details."
        },
        {
            id: 3,
            user: "Ravi K.",
            question: "When is the next webinar on AI in Pharma?",
            answer: "Our next webinar is scheduled for the 25th of this month. You will receive a notification email if you are subscribed to our newsletter."
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', query: '' });
            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);
        }, 1000);
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

                        {activeTab === 'qa' && (
                            <div className="qa-list">
                                {mockQA.map(item => (
                                    <div key={item.id} className="qa-card">
                                        <div className="qa-question">
                                            <strong>{item.user} asks:</strong>
                                            <p>{item.question}</p>
                                        </div>
                                        <div className="qa-answer">
                                            <strong>Admin Answer:</strong>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
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
