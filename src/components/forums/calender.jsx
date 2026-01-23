import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Calendar = () => {
    const navigate = useNavigate();
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingType, setBookingType] = useState('consultation');
    const [notes, setNotes] = useState('');

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // ✅ FETCH USER BOOKINGS (REUSABLE)
    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return;

        try {
            const res = await fetch(
                `${API_BASE}/api/calendar/user/${user.id}`
            );
            const data = await res.json();

            const formatted = data.map(item => ({
                date: item.booking_date, // YYYY-MM-DD
                title:
                    item.booking_type === 'consultation'
                        ? '1:1 Expert Consultation'
                        : item.booking_type === 'regulatory'
                        ? 'Regulatory Advisory'
                        : 'Technical Review',
                status: item.status
            }));

            setEvents(formatted);
        } catch (err) {
            console.error('Fetch booking error:', err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getDaysInMonth = (date) =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const getFirstDayOfMonth = (date) =>
        new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handlePrevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const handleNextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    // ✅ DATE CLICK (FIXED 🔥)
    const handleDayClick = async (day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        const dateStr = clickedDate.toISOString().split('T')[0];

        // 🔥 Always sync latest approval status
        await fetchBookings();

        const updatedEvent = events.find(e => e.date === dateStr) || null;

        setSelectedDate(clickedDate);
        setSelectedEvent(updatedEvent);
        setShowModal(true);
    };

    // ✅ SUBMIT NEW BOOKING
    const handleScheduleSubmit = async (e) => {
        e.preventDefault();

        if (selectedEvent) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) {
            alert('Please login first');
            return;
        }

        const payload = {
            user_id: user.id,
            booking_date: selectedDate.toISOString().split('T')[0],
            booking_type: bookingType,
            notes
        };

        try {
            const res = await fetch(`${API_BASE}/api/calendar/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert('Booking request sent');
            setShowModal(false);
            setNotes('');

            // Optimistic UI update
            setEvents(prev => [
                ...prev,
                {
                    date: payload.booking_date,
                    title:
                        bookingType === 'consultation'
                            ? '1:1 Expert Consultation'
                            : bookingType === 'regulatory'
                            ? 'Regulatory Advisory'
                            : 'Technical Review',
                    status: 'pending'
                }
            ]);
        } catch (err) {
            alert('Failed to submit booking request');
        }
    };

    const renderCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
            ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday =
                today.toDateString() ===
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'is-today' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    <span className="day-number">{day}</span>

                    <div className="day-events">
                        {dayEvents.map((ev, idx) => (
                            <div key={idx} className={`event-indicator ${ev.status}`}>
                                {ev.title}
                            </div>
                        ))}
                    </div>

                    <button className="schedule-trigger">+</button>
                </div>
            );
        }
        return days;
    };

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    return (
        <div className="calendar-container">
            <div className="calendar-header-section">
                <h1>Pharma Expert Calendar</h1>
                <p className="calendar-subtitle">
                    Visulize key milestones and schedule expert consultations.
                </p>
            </div>

            <div className="calendar-controls">
                <button className="control-btn" onClick={handlePrevMonth}>&lt; Prev</button>
                <div className="current-month">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <button className="control-btn" onClick={handleNextMonth}>Next &gt;</button>
            </div>

            <div className="calendar-grid">
                <div className="calendar-day-header">Sun</div>
                <div className="calendar-day-header">Mon</div>
                <div className="calendar-day-header">Tue</div>
                <div className="calendar-day-header">Wed</div>
                <div className="calendar-day-header">Thu</div>
                <div className="calendar-day-header">Fri</div>
                <div className="calendar-day-header">Sat</div>
                {renderCalendarGrid()}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Schedule Expert Session</h2>
                            <p className="modal-date">
                                Selected Date: {selectedDate?.toDateString()}
                            </p>

                            {selectedEvent && (
                                <p style={{ fontWeight: 'bold', marginTop: '6px' }}>
                                    Status: {selectedEvent.status.toUpperCase()}
                                </p>
                            )}
                        </div>

                        {!selectedEvent && (
                            <form onSubmit={handleScheduleSubmit}>
                                <div className="form-group">
                                    <label>Session Type</label>
                                    <select
                                        value={bookingType}
                                        onChange={(e) => setBookingType(e.target.value)}
                                    >
                                        <option value="consultation">1:1 Expert Consultation</option>
                                        <option value="regulatory">Regulatory Advisory</option>
                                        <option value="technical">Technical Review</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Topic / Notes</label>
                                    <textarea
                                        rows="3"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-confirm">
                                        Request Booking
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
