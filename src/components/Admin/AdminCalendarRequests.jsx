import React, { useEffect, useState } from 'react';
import { calendarAPI } from '../../services/api';
import './AdminCalendarRequests.css';

const AdminCalendarRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [activeId, setActiveId] = useState(null);

    // 🔹 store inputs per active row
    const [formData, setFormData] = useState({
        session_time: '',
        meeting_link: ''
    });

    const loadRequests = async () => {
        try {
            setLoading(true);
            const res = await calendarAPI.getAdminRequests();
            setRequests(res.data || []);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to load calendar requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const openApproveBox = (req) => {
        setActiveId(req.id);
        setFormData({
            session_time: req.session_time || '',
            meeting_link: req.meeting_link || ''
        });
    };

    const approveRequest = async (id) => {
        if (!formData.session_time || !formData.meeting_link) {
            alert('Please enter session time and meeting link');
            return;
        }

        try {
            await calendarAPI.updateStatus({
                id,
                status: 'approved',
                session_time: formData.session_time,
                meeting_link: formData.meeting_link
            });

            setActiveId(null);
            setFormData({ session_time: '', meeting_link: '' });
            loadRequests();
        } catch {
            alert('Approval failed');
        }
    };

    const rejectRequest = async (id) => {
        try {
            await calendarAPI.updateStatus({
                id,
                status: 'rejected'
            });
            loadRequests();
        } catch {
            alert('Rejection failed');
        }
    };

    return (
        <div className="admin-calendar-container">
            <h1 className="admin-title">Calendar Booking Requests</h1>

            {loading && <p className="loading-text">Loading requests...</p>}
            {error && <p className="loading-text">{error}</p>}

            {!loading && requests.length === 0 && (
                <p className="empty-text">No booking requests found.</p>
            )}

            {!loading && requests.length > 0 && (
                <table className="admin-calendar-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Notes</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map(r => (
                            <tr key={r.id}>
                                <td>
                                    <strong>{r.full_name}</strong>
                                    <div className="email">{r.email}</div>
                                </td>

                                <td>{r.booking_date}</td>
                                <td className="type">{r.booking_type}</td>
                                <td className="notes">{r.notes || '-'}</td>

                                <td>
                                    <span className={`status-badge ${r.status}`}>
                                        {r.status}
                                    </span>

                                    {/* 🔹 show approved info */}
                                    {r.status === 'approved' && (
                                        <div className="approved-info">
                                            <small>{r.session_time}</small>
                                            <br />
                                            <a href={r.meeting_link} target="_blank" rel="noreferrer">
                                                Meeting Link
                                            </a>
                                        </div>
                                    )}
                                </td>

                                <td>
                                    {r.status === 'pending' ? (
                                        activeId === r.id ? (
                                            <div className="approve-box">
                                                <input
                                                    type="text"
                                                    placeholder="Session Time (e.g. 6 PM)"
                                                    value={formData.session_time}
                                                    onChange={e =>
                                                        setFormData({
                                                            ...formData,
                                                            session_time: e.target.value
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Meeting Link"
                                                    value={formData.meeting_link}
                                                    onChange={e =>
                                                        setFormData({
                                                            ...formData,
                                                            meeting_link: e.target.value
                                                        })
                                                    }
                                                />

                                                <button
                                                    className="btn approve"
                                                    onClick={() => approveRequest(r.id)}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="action-buttons">
                                                <button
                                                    className="btn approve"
                                                    onClick={() => openApproveBox(r)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="btn reject"
                                                    onClick={() => rejectRequest(r.id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <span className="no-action">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminCalendarRequests;
