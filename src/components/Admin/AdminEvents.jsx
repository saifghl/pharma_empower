import React, { useState, useEffect } from 'react';
import './AdminEvents.css';
import { initialEvents } from '../Events/eventsData';
import Modal from './Modal';

const AdminEvents = () => {
    // Initialize with data from localStorage if available, else use initial dummy data
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('adminEvents');
        return saved ? JSON.parse(saved) : initialEvents;
    });

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        venue: '',
        category: '',
        last_date_reg: '',
        reg_link: ''
    });
    const [editingId, setEditingId] = useState(null);

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'confirm', // 'confirm' or 'success'
        title: '',
        message: '',
        onConfirm: null
    });

    // Save to localStorage whenever events change to simulate persistence
    useEffect(() => {
        localStorage.setItem('adminEvents', JSON.stringify(events));
    }, [events]);

    // Helper to close modal
    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    // Helper to show modal
    const showModal = (type, title, message, onConfirm = null) => {
        setModalConfig({
            isOpen: true,
            type,
            title,
            message,
            onConfirm
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            // Confirm update? The user asked for "delete and update" popups.
            // Let's do a success popup AFTER update, but maybe a confirm before?
            // "make own in admin for delete and update" -> Implies confirm before action or nice feedback.
            // I'll do a Success popup after saving.

            setEvents(events.map(ev => ev.id === editingId ? { ...formData, id: editingId } : ev));
            setEditingId(null);
            showModal('success', 'Success!', 'Event updated successfully.');
        } else {
            const newEvent = { ...formData, id: Date.now() };
            setEvents([newEvent, ...events]);
            showModal('success', 'Success!', 'New event added successfully.');
        }

        setFormData({ name: '', date: '', venue: '', category: '', last_date_reg: '', reg_link: '' });
    };

    const handleEdit = (event) => {
        setFormData({
            name: event.name,
            date: event.date,
            venue: event.venue,
            category: event.category,
            last_date_reg: event.last_date_reg,
            reg_link: event.reg_link
        });
        setEditingId(event.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const confirmDelete = (id) => {
        showModal(
            'confirm',
            'Delete Event?',
            'Are you sure you want to delete this event? This action cannot be undone.',
            () => {
                setEvents(prev => prev.filter(ev => ev.id !== id));
                closeModal();
                // Optional: Show success after delete
                // setTimeout(() => showModal('success', 'Deleted', 'Event deleted successfully.'), 300);
            }
        );
    };

    return (
        <div className="admin-events-container">
            <Modal
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={closeModal}
            />

            <h2>Manage Events</h2>

            <div className="event-form-card">
                <h3>{editingId ? 'Edit Event' : 'Add New Event'}</h3>
                <form onSubmit={handleSubmit} className="event-form">
                    <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="date" placeholder="Date (e.g., Feb 24-26, 2025)" value={formData.date} onChange={handleChange} required />
                    <input type="text" name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
                    <input type="text" name="last_date_reg" placeholder="Last Date of Reg." value={formData.last_date_reg} onChange={handleChange} required />
                    <input type="text" name="reg_link" placeholder="Registration Link" value={formData.reg_link} onChange={handleChange} required />
                    <button type="submit" className="save-btn">{editingId ? 'Update Event' : 'Add Event'}</button>
                    {editingId && (
                        <button type="button" className="cancel-btn" onClick={() => {
                            setEditingId(null);
                            setFormData({ name: '', date: '', venue: '', category: '', last_date_reg: '', reg_link: '' });
                        }}>Cancel</button>
                    )}
                </form>
            </div>

            <div className="events-list">
                <h3>Current Events</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.venue}</td>
                                <td>
                                    <button onClick={() => handleEdit(event)} className="edit-btn">Edit</button>
                                    <button onClick={() => confirmDelete(event.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEvents;
