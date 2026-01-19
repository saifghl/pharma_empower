import React, { useState } from 'react';
import { Search, Send, CheckCircle, Clock } from 'lucide-react';

const ChatManagement = () => {
    // Mock Data
    const [enquiries, setEnquiries] = useState([
        { id: 101, user: "Alice Walker", question: "Do you offer internships?", date: "2024-03-15", status: "Pending", answer: "" },
        { id: 102, user: "Bob Miller", question: "How to reset my password?", date: "2024-03-14", status: "Answered", answer: "Go to login page and click Forgot Password." },
        { id: 103, user: "Charlie D.", question: "Are the courses good for experienced pros?", date: "2024-03-14", status: "Pending", answer: "" },
        { id: 104, user: "David Lee", question: "Payment methods accepted?", date: "2024-03-13", status: "Answered", answer: "Credit Card, PayPal, and Bank Transfer." },
    ]);

    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

    const handleSubmitReply = (id) => {
        setEnquiries(prev => prev.map(enq =>
            enq.id === id ? { ...enq, status: "Answered", answer: replyText } : enq
        ));
        setAnsweringId(null);
        setReplyText("");
    };

    const styles = {
        container: {
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        },
        header: {
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        title: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#333'
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
        },
        th: {
            padding: '1rem',
            backgroundColor: '#f1f3f5',
            color: '#666',
            fontWeight: '600',
            borderBottom: '1px solid #e9ecef'
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid #e9ecef',
            verticalAlign: 'middle'
        },
        statusBadge: (status) => ({
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: status === 'Answered' ? '#d3f9d8' : '#fff3bf',
            color: status === 'Answered' ? '#2b8a3e' : '#f08c00',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
        }),
        replyInput: {
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            marginTop: '8px',
            marginBottom: '8px'
        },
        actionBtn: {
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: '#228be6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Public Chat Enquiries</h2>
                {/* Mock search/filter could go here */}
            </div>

            <div style={styles.card}>
                <div className="table-responsive">
                    <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>User</th>
                                <th style={styles.th}>Question</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.filter(enq => enq.status === 'Pending').length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                        <div style={{ color: '#aaa', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                            <CheckCircle size={40} color="#28a745" opacity={0.5} />
                                            No pending enquiries. Good job!
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                enquiries.filter(enq => enq.status === 'Pending').map((enq) => (
                                    <tr key={enq.id}>
                                        <td data-label="ID">#{enq.id}</td>
                                        <td data-label="User">
                                            <div style={{ fontWeight: '500' }}>{enq.user}</div>
                                            <div style={{ fontSize: '12px', color: '#888' }}>{enq.date}</div>
                                        </td>
                                        <td data-label="Question">
                                            <div>{enq.question}</div>
                                            {enq.answer && (
                                                <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f8f9fa', borderRadius: '4px', borderLeft: '3px solid #28a745' }}>
                                                    <small style={{ color: '#28a745', fontWeight: 'bold' }}>Admin:</small>
                                                    <small style={{ display: 'block', color: '#555' }}>{enq.answer}</small>
                                                </div>
                                            )}
                                        </td>
                                        <td data-label="Status">
                                            <span style={styles.statusBadge(enq.status)}>
                                                {enq.status === 'Answered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {enq.status}
                                            </span>
                                        </td>
                                        <td data-label="Action">
                                            {answeringId === enq.id ? (
                                                <div>
                                                    <textarea
                                                        rows="3"
                                                        style={styles.replyInput}
                                                        placeholder="Type your answer..."
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                    />
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button
                                                            style={styles.actionBtn}
                                                            onClick={() => handleSubmitReply(enq.id)}
                                                        >
                                                            Send
                                                        </button>
                                                        <button
                                                            style={{ ...styles.actionBtn, backgroundColor: '#868e96' }}
                                                            onClick={() => setAnsweringId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                enq.status === 'Pending' ? (
                                                    <button style={styles.actionBtn} onClick={() => handleReplyClick(enq.id)}>
                                                        <Send size={14} /> Reply
                                                    </button>
                                                ) : (
                                                    <button style={{ ...styles.actionBtn, backgroundColor: 'transparent', color: '#2b8a3e', border: '1px solid #2b8a3e' }} onClick={() => handleReplyClick(enq.id)}>
                                                        Edit Reply
                                                    </button>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ChatManagement;
