 import React, { useEffect, useState } from 'react';
import { contactAPI } from '../../services/api';

const Enquiries = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [enquiries, setEnquiries] = useState([]);

    // ✅ FETCH FROM DB
    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const res = await contactAPI.getAll();
            setEnquiries(res.data);
        } catch (err) {
            console.error('Failed to fetch enquiries', err);
        }
    };

    const handleView = async (enq) => {
        setSelectedEnquiry(enq);

        // ✅ MARK AS READ ONLY IF NEW
        if (enq.status === 'New') {
            try {
                await contactAPI.markAsRead(enq.id);

                setEnquiries(prev =>
                    prev.map(item =>
                        item.id === enq.id
                            ? { ...item, status: 'Read' }
                            : item
                    )
                );
            } catch (err) {
                console.error('Failed to mark as read', err);
            }
        }
    };

    const filteredEnquiries = enquiries.filter(enq =>
        enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <header className="admin-page-header">
                <h1>Incoming Enquiries</h1>
            </header>

            <div className="admin-card">
                <div className="table-actions">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEnquiries.map(enq => (
                                <tr key={enq.id}>
                                    <td>{enq.name}</td>
                                    <td>{enq.email}</td>
                                    <td>{enq.subject}</td>
                                    <td>{enq.message.substring(0, 30)}...</td>
                                    <td>{new Date(enq.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span
                                            className={`badge ${enq.status === 'New'
                                                    ? 'badge-new'
                                                    : 'badge-read'
                                                }`}
                                        >
                                            {enq.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                cursor: 'pointer',
                                                border: 'none',
                                                background: 'none',
                                                color: '#1a237e',
                                                fontWeight: '600'
                                            }}
                                            onClick={() => handleView(enq)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== VIEW MODAL ===== */}
            {selectedEnquiry && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>{selectedEnquiry.subject}</h3>

                        <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                        <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                        <p>
                            <strong>Date:</strong>{' '}
                            {new Date(selectedEnquiry.created_at).toLocaleString()}
                        </p>

                        {selectedEnquiry.organization_need && (
                            <p>
                                <strong>Organizational Need:</strong><br />
                                {selectedEnquiry.organization_need}
                            </p>
                        )}

                        <div className="modal-message">
                            <strong>Message:</strong>
                            <p>{selectedEnquiry.message}</p>
                        </div>

                        <button
                            className="close-btn"
                            onClick={() => setSelectedEnquiry(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiries;