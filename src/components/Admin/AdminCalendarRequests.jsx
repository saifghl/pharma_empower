import React, { useEffect, useState } from 'react';
import { calendarAPI } from '../../services/api';
import './AdminCalendarRequests.css'; // ✅ IMPORT CSS

const AdminCalendarRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const updateStatus = async (id, status) => {
        try {
            await calendarAPI.updateStatus({ id, status });
            loadRequests();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    return (
        <div className="admin-calendar-container">
            <h1 className="admin-title">Calendar Booking Requests</h1>

            {loading && <p className="loading-text">Loading requests...</p>}
            {error && <p className="loading-text">{error}</p>}

            {!loading && !error && requests.length === 0 && (
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
                                        <div className="action-buttons">
                                            <button
                                                className="btn approve"
                                                onClick={() => updateStatus(r.id, 'approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn reject"
                                                onClick={() => updateStatus(r.id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
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
