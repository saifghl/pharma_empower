import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { communityAPI } from '../../services/api';

const ChatManagement = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Fetch pending questions (ADMIN)
    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await communityAPI.getAllAdmin();

                const formatted = res.data.map(q => ({
                    id: q.id,
                    user: q.user_name || "Anonymous",
                    question: q.question,
                    date: q.created_at?.split("T")[0],
                    status: q.answer ? "Answered" : "Pending",
                    answer: q.answer || ""
                }));

                setEnquiries(formatted);
            } catch (err) {
                console.error(err);
                setError("Failed to load community enquiries");
            } finally {
                setLoading(false);
            }
        };

        fetchPending();
    }, []);

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

    // 🔹 Submit answer
    const handleSubmitReply = async (id) => {
        if (!replyText.trim()) return;

        try {
            await communityAPI.answerQuestion(id, { answer: replyText });

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
            alert("Failed to submit answer");
        }
    };

    /* ================= STYLES ================= */
    const styles = {
        container: {
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        },
        header: {
            marginBottom: '2rem'
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
            fontWeight: '600'
        },
        statusBadge: (status) => ({
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
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
            marginBottom: '8px'
        },
        actionBtn: {
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#228be6',
            color: 'white',
            cursor: 'pointer',
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
                <table width="100%">
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
                                    <div>No pending enquiries 🎉</div>
                                </td>
                            </tr>
                        ) : enquiries.map(enq => (
                            <tr key={enq.id}>
                                <td>#{enq.id}</td>
                                <td>{enq.user}</td>
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
