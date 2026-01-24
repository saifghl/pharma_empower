import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

// ✅ SAFE API BASE (LOCAL + DEPLOY)
const API_BASE = (
  process.env.REACT_APP_API_URL || 'https://pharma-empowerr.onrender.com'
).replace(/\/$/, '');

const ChatManagement = () => {

    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* ================= FETCH PENDING QUESTIONS ================= */
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

    /* ================= SUBMIT ANSWER ================= */
    const handleSubmitReply = async (id) => {
        if (!replyText.trim()) return;

        try {
            const res = await fetch(
                `${API_BASE}/api/admin/community/answer/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
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

    /* ================= UI (UNCHANGED) ================= */
    if (loading) return <div style={{ padding: '2rem' }}>Loading enquiries...</div>;
    if (error) return <div style={{ padding: '2rem' }}>❌ {error}</div>;

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <h2>Public Chat Enquiries</h2>

            <table style={{ width: '100%', background: '#fff', borderRadius: '10px' }}>
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
                    {enquiries.map(enq => (
                        <tr key={enq.id}>
                            <td>#{enq.id}</td>
                            <td>{enq.user}</td>
                            <td>{enq.question}</td>
                            <td>
                                {enq.status === "Answered"
                                    ? <CheckCircle size={16} color="green" />
                                    : <Clock size={16} color="orange" />}
                            </td>
                            <td>
                                {answeringId === enq.id ? (
                                    <>
                                        <textarea
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
