import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react'; // ✅ ADD

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

    /* ================= FETCH USER BOOKINGS ================= */
    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return;

        try {
            const res = await fetch(`${API_BASE}/api/calendar/user/${user.id}`);
            if (!res.ok) throw new Error('Fetch failed');

            const data = await res.json();

            const formatted = data.map(item => ({
                date: item.booking_date,
                title:
                    item.booking_type === 'consultation'
                        ? '1:1 Expert Consultation'
                        : item.booking_type === 'regulatory'
                        ? 'Regulatory Advisory'
                        : 'Technical Review',
                status: item.status // ✅ pending | approved | rejected
            }));

            setEvents(formatted);
        } catch (err) {
            console.error('Fetch booking error:', err);
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

        await fetchBookings(); // ✅ refresh latest admin decision

        const updatedEvent = events.find(e => e.date === dateStr) || null;

        setSelectedDate(clickedDate);
        setSelectedEvent(updatedEvent);
        setShowModal(true);
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
                                {ev.status === 'approved' && <CheckCircle size={14} color="green" />}
                                {ev.status === 'rejected' && <XCircle size={14} color="red" />}
                                {ev.status === 'pending' && <Clock size={14} color="orange" />}
                                <span>{ev.title}</span>
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
            {/* UI SAME AS BEFORE */}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Schedule Expert Session</h2>
                            <p className="modal-date">
                                Selected Date: {selectedDate?.toDateString()}
                            </p>

                            {selectedEvent && (
                                <p style={{ fontWeight: 'bold', marginTop: '8px' }}>
                                    Status:&nbsp;
                                    {selectedEvent.status === 'approved' && (
                                        <span style={{ color: 'green' }}>✔ Approved</span>
                                    )}
                                    {selectedEvent.status === 'rejected' && (
                                        <span style={{ color: 'red' }}>✖ Rejected</span>
                                    )}
                                    {selectedEvent.status === 'pending' && (
                                        <span style={{ color: 'orange' }}>⏳ Pending</span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
