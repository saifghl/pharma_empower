import React, { useEffect, useState } from 'react';
import { calendarAPI } from '../../services/api';
import './AdminCalendarRequests.css';

const AdminCalendarRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [activeId, setActiveId] = useState(null);
    const [sessionTime, setSessionTime] = useState('');
    const [meetingLink, setMeetingLink] = useState('');

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

    const approveRequest = async (id) => {
        if (!sessionTime || !meetingLink) {
            alert('Please enter session time and meeting link');
            return;
        }

        try {
            await calendarAPI.updateStatus({
                id,
                status: 'approved',
                session_time: sessionTime,
                meeting_link: meetingLink
            });

            setActiveId(null);
            setSessionTime('');
            setMeetingLink('');
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
                                </td>

                                <td>
                                    {r.status === 'pending' ? (
                                        activeId === r.id ? (
                                            <div className="approve-box">
                                                <input
                                                    type="text"
                                                    placeholder="Session Time (e.g. 6 PM)"
                                                    value={sessionTime}
                                                    onChange={e => setSessionTime(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Meeting Link"
                                                    value={meetingLink}
                                                    onChange={e => setMeetingLink(e.target.value)}
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
                                                    onClick={() => setActiveId(r.id)}
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
