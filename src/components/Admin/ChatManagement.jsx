import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ChatManagement = () => {

    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Fetch pending questions
    useEffect(() => {
        fetch(`${API_BASE}/api/admin/community/pending`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load enquiries");
                return res.json();
            })
            .then(data => {
                const formatted = data.map(q => ({
                    id: q.id,
                    user: q.user_name || "Anonymous",
                    question: q.question,
                    date: q.created_at?.split("T")[0],
                    status: "Pending",
                    answer: ""
                }));
                setEnquiries(formatted);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

    // 🔹 Submit answer
    const handleSubmitReply = async (id) => {
        if (!replyText.trim()) return;

        try {
            const res = await fetch(
                `${API_BASE}/api/admin/community/answer/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ answer: replyText })
                }
            );

            if (!res.ok) throw new Error("Failed to submit answer");

            setEnquiries(prev =>
                prev.map(enq =>
                    enq.id === id
                        ? { ...enq, status: "Answered", answer: replyText }
                        : enq
                )
            );

            setAnsweringId(null);
            setReplyText("");
        } catch (err) {
            alert(err.message);
        }
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
        th: {
            padding: '1rem',
            backgroundColor: '#f1f3f5',
            color: '#666',
            fontWeight: '600',
            borderBottom: '1px solid #e9ecef'
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

    if (loading) return <div style={styles.container}>Loading enquiries...</div>;
    if (error) return <div style={styles.container}>❌ {error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Public Chat Enquiries</h2>
            </div>

            <div style={styles.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                        {enquiries.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <CheckCircle size={40} color="#28a745" />
                                    <div>No pending enquiries. Good job!</div>
                                </td>
                            </tr>
                        ) : enquiries.map(enq => (
                            <tr key={enq.id}>
                                <td>#{enq.id}</td>
                                <td>
                                    <div style={{ fontWeight: 500 }}>{enq.user}</div>
                                    <small>{enq.date}</small>
                                </td>
                                <td>{enq.question}</td>
                                <td>
                                    <span style={styles.statusBadge(enq.status)}>
                                        {enq.status === "Answered"
                                            ? <CheckCircle size={12} />
                                            : <Clock size={12} />}
                                        {enq.status}
                                    </span>
                                </td>
                                <td>
                                    {answeringId === enq.id ? (
                                        <>
                                            <textarea
                                                rows="3"
                                                style={styles.replyInput}
                                                value={replyText}
                                                onChange={e => setReplyText(e.target.value)}
                                            />
                                            <button
                                                style={styles.actionBtn}
                                                onClick={() => handleSubmitReply(enq.id)}
                                            >
                                                <Send size={14} /> Send
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            style={styles.actionBtn}
                                            onClick={() => handleReplyClick(enq.id)}
                                        >
                                            <Send size={14} /> Reply
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChatManagement;
