import React, { useState } from 'react';

const Enquiries = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const mockEnquiries = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subject: 'Course Pricing', message: 'Hi, I would like to know the cost of the GxP course.', date: '2024-10-25', status: 'New' },
        { id: 2, name: 'Bob Smith', email: 'bob.smith@pharmaco.com', subject: 'Partnership Inquiry', message: 'We are interested in corporate training for our team.', date: '2024-10-24', status: 'Read' },
        { id: 3, name: 'Charlie Davis', email: 'charlie.d@student.edu', subject: 'Internship Opportunities', message: 'Do you offer placement assistance?', date: '2024-10-23', status: 'Read' },
        { id: 4, name: 'Dana Lee', email: 'dana@techbio.org', subject: 'Technical Issue', message: 'I cannot access the Skill Board.', date: '2024-10-22', status: 'New' },
    ];

    const filteredEnquiries = mockEnquiries.filter(enq =>
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
                                <td>{enq.date}</td>
                                <td>
                                    <span className={`badge ${enq.status === 'New' ? 'badge-new' : 'badge-read'}`}>
                                        {enq.status}
                                    </span>
                                </td>
                                <td>
                                    <button style={{ marginRight: '5px', cursor: 'pointer', border: 'none', background: 'none', color: '#1a237e' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Enquiries;
