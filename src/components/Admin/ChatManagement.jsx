import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { communityAPI } from '../../services/api';

const ChatManagement = () => {

    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEnquiries = async () => {
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
                console.error(err);
                setError("Unable to fetch enquiries");
            } finally {
                setLoading(false);
            }
        };

        loadEnquiries();
    }, []);

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

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
            console.error(err);
            alert("Answer submission failed");
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading enquiries...</div>;
    if (error) return <div style={{ padding: '2rem' }}>❌ {error}</div>;

    return (
        <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
            <h2>Public Chat Enquiries</h2>

            <table style={{ width: '100%', background: '#fff' }}>
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
                    {enquiries.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                <CheckCircle size={40} />
                                <div>No pending enquiries</div>
                            </td>
                        </tr>
                    ) : enquiries.map(enq => (
                        <tr key={enq.id}>
                            <td>#{enq.id}</td>
                            <td>{enq.user}</td>
                            <td>{enq.question}</td>
                            <td>
                                <span>
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
