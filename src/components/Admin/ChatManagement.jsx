import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

const API_BASE =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

const ChatManagement = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/api/admin/community/pending`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch enquiries");
                return res.json();
            })
            .then(data => {
                const formatted = data.map(q => ({
                    id: q.id,
                    user: q.user_name || "Anonymous",
                    question: q.question,
                    date: q.created_at?.split("T")[0],
                    status: q.answer ? "Answered" : "Pending",
                    answer: q.answer || ""
                }));
                setEnquiries(formatted);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
                prev.map(e =>
                    e.id === id ? { ...e, status: "Answered", answer: replyText } : e
                )
            );

            setAnsweringId(null);
            setReplyText("");
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div>Loading enquiries...</div>;
    if (error) return <div>❌ {error}</div>;

    return (
        <table>
            <tbody>
                {enquiries.map(enq => (
                    <tr key={enq.id}>
                        <td>{enq.question}</td>
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
                                <button onClick={() => setAnsweringId(enq.id)}>
                                    Reply
                                </button>
                            )}
                        </td>
                        <td>
                            {enq.status === "Answered"
                                ? <CheckCircle size={14} />
                                : <Clock size={14} />}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChatManagement;
