import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = (
  process.env.REACT_APP_API_URL || 'http://localhost:5000'
).replace(/\/$/, '');

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
    const [loading, setLoading] = useState(false);  // Added for loading state
    const [error, setError] = useState('');  // Added for error display

    /* ================= GET AUTH TOKEN ================= */
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    /* ================= FETCH USER BOOKINGS ================= */
    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return [];

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE}/api/calendar/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()  // 🔥 FIX: Add Bearer token to avoid CORS/auth errors
                }
            });

            if (!res.ok) {
                if (res.status === 401) throw new Error('Unauthorized. Please login again.');
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            const formatted = data.map(item => {
                let status = 'pending';
                if (item.status === 'approved' || item.status === 'APPROVED' || item.status === 1) {
                    status = 'approved';
                }
                if (item.status === 'rejected' || item.status === 'REJECTED' || item.status === 0) {
                    status = 'rejected';
                }

                return {
                    date: item.booking_date,
                    title:
                        item.booking_type === 'consultation'
                            ? '1:1 Expert Consultation'
                            : item.booking_type === 'regulatory'
                            ? 'Regulatory Advisory'
                            : 'Technical Review',
                    status,
                    session_time: item.session_time,
                    meeting_link: item.meeting_link  // 🔥 Added for link display
                };
            });

            setEvents(formatted);
            return formatted;
        } catch (err) {
            console.error('Fetch booking error:', err);
            setError(err.message || 'Failed to load bookings. Check your connection.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    /* ================= DATE CLICK ================= */
    const handleDayClick = async (day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        const dateStr = clickedDate.toISOString().split('T')[0];
        const latestEvents = await fetchBookings();
        const updatedEvent = latestEvents.find(e => e.date === dateStr) || null;

        setSelectedDate(clickedDate);
        setSelectedEvent(updatedEvent);
        setShowModal(true);
    };

    /* ================= SUBMIT BOOKING ================= */
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

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/calendar/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()  // 🔥 FIX: Add Bearer token
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Submission failed');

            alert('Booking request sent');
            setShowModal(false);
            setNotes('');
            fetchBookings();  // Refresh after submit
        } catch (err) {
            console.error('Submit error:', err);
            alert('Failed to submit booking request. Try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ================= CALENDAR GRID ================= */
    const renderCalendarGrid = () => {
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
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
                                {ev.status === 'approved' && '✔ '}
                                {ev.status === 'rejected' && '✖ '}
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

    return (
        <div className="calendar-container">
            <h1>Pharma Expert Calendar</h1>

            {loading && <p>Loading bookings...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="calendar-grid">
                {renderCalendarGrid()}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Schedule Expert Session</h2>
                        <p>{selectedDate?.toDateString()}</p>

                        {selectedEvent && (
                            <div>
                                <p>Status: <b>{selectedEvent.status.toUpperCase()}</b></p>
                                {selectedEvent.status === 'approved' && selectedEvent.session_time && (
                                    <p>Time: {selectedEvent.session_time}</p>
                                )}
                                {selectedEvent.status === 'approved' && selectedEvent.meeting_link && (
                                    <p>
                                        <a href={selectedEvent.meeting_link} target="_blank" rel="noreferrer">
                                            Join Session
                                        </a>
                                    </p>
                                )}
                            </div>
                        )}

                        {!selectedEvent && (
                            <form onSubmit={handleScheduleSubmit}>
                                <select
                                    value={bookingType}
                                    onChange={e => setBookingType(e.target.value)}
                                >
                                    <option value="consultation">Consultation</option>
                                    <option value="regulatory">Regulatory</option>
                                    <option value="technical">Technical</option>
                                </select>

                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Notes"
                                />

                                <button type="submit" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Request Booking'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
