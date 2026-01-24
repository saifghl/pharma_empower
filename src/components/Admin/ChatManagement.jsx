import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { communityAPI } from '../../services/api';

const ChatManagement = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* ================= FETCH PENDING ================= */
    useEffect(() => {
        const loadPending = async () => {
            try {
                const res = await communityAPI.getAllAdmin();

                const formatted = res.data.map(q => ({
                    id: q.id,
                    user: q.user_name || "Anonymous",
                    question: q.question,
                    date: q.created_at?.split("T")[0],
                    status: "Pending",
                    answer: ""
                }));

                setEnquiries(formatted);
            } catch (err) {
                setError("Failed to load enquiries");
            } finally {
                setLoading(false);
            }
        };

        loadPending();
    }, []);

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

    /* ================= SUBMIT ANSWER ================= */
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

    if (loading) return <div style={{ padding: 20 }}>Loading enquiries...</div>;
    if (error) return <div style={{ padding: 20 }}>❌ {error}</div>;

    return (
        <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
            <h2>Public Chat Enquiries</h2>

            <table width="100%" style={{ background: '#fff', borderRadius: 10 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Question</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {enquiries.length === 0 && (
                        <tr>
                            <td colSpan="5" align="center" style={{ padding: 40 }}>
                                <CheckCircle size={40} color="green" />
                                <div>No pending enquiries</div>
                            </td>
                        </tr>
                    )}

                    {enquiries.map(enq => (
                        <tr key={enq.id}>
                            <td>#{enq.id}</td>
                            <td>{enq.user}</td>
                            <td>{enq.question}</td>
                            <td>
                                {enq.status === "Answered"
                                    ? <CheckCircle size={16} color="green" />
                                    : <Clock size={16} color="orange" />
                                } {enq.status}
                            </td>
                            <td>
                                {answeringId === enq.id ? (
                                    <>
                                        <textarea
                                            rows="3"
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                        />
                                        <button onClick={() => handleSubmitReply(enq.id)}>
                                            <Send size={14} /> Send
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => handleReplyClick(enq.id)}>
                                        <Send size={14} /> Reply
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChatManagement;
