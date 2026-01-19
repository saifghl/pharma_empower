import React, { useState, useEffect } from 'react';
import { Trash2, Bell, Calendar } from 'lucide-react';
import './AdminNotifications.css';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'event',
        date: '',
        message: ''
    });

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('pharma_notifications');
        if (saved) {
            setNotifications(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage whenever list updates
    useEffect(() => {
        localStorage.setItem('pharma_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotification = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString()
        };
        setNotifications([newNotification, ...notifications]);
        setFormData({ title: '', type: 'event', date: '', message: '' });
    };

    const handleDelete = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="admin-notifications-container">
            <div className="notifications-header">
                <h2>Manage Notifications</h2>
                <div className="header-meta">
                    <Bell size={20} />
                    <span>Active Alerts: {notifications.length}</span>
                </div>
            </div>

            <div className="notification-form-card">
                <h3 className="form-title">Create New Notification</h3>
                <form onSubmit={handleSubmit} className="notification-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Annual Pharma Summit"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="event">Upcoming Event</option>
                            <option value="session">Student Session</option>
                            <option value="alert">Important Alert</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Event Date (Optional)</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Message / Description</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter brief details about the event..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Publish Notification</button>
                </form>
            </div>

            <div className="notifications-list-section">
                <div className="list-header">
                    <h3>Active Notifications (Live on Website)</h3>
                </div>
                <table className="notifications-table data-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Preview</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', color: '#a0aec0' }}>
                                    No active notifications
                                </td>
                            </tr>
                        ) : (
                            notifications.map((note) => (
                                <tr key={note.id}>
                                    <td data-label="Type">
                                        <span className={`type-badge ${note.type}`}>{note.type}</span>
                                    </td>
                                    <td data-label="Title"><strong>{note.title}</strong></td>
                                    <td data-label="Date">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={14} />
                                            {note.date || 'N/A'}
                                        </div>
                                    </td>
                                    <td data-label="Preview">{note.message.substring(0, 50)}...</td>
                                    <td data-label="Action">
                                        <button onClick={() => handleDelete(note.id)} className="delete-btn">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNotifications;
