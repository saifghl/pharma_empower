import React, { useState } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
    const navigate = useNavigate();
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingType, setBookingType] = useState('consultation');

    // Mock Events Data tailored for Pharma
    const events = [
        { date: '2026-01-25', title: 'FDA Submission Deadline', type: 'fda' },
        { date: '2026-01-28', title: 'Oncology Drug Launch', type: 'event-drug-launch' },
        { date: '2026-02-05', title: 'Phase III Trial Results', type: 'event-trial' },
        { date: '2026-02-12', title: 'Global Compliance Audit', type: 'event-audit' },
        { date: '2026-01-22', title: 'Expert Advisory Board', type: 'event-advisory' },
    ];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(clickedDate);
        setShowModal(true);
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        alert(`Request sent for ${bookingType} on ${selectedDate.toDateString()}. An expert will confirm shortly.`);
        setShowModal(false);
    };

    const renderCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = today.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'is-today' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    <span className="day-number">{day}</span>
                    <div className="day-events">
                        {dayEvents.map((ev, idx) => (
                            <div key={idx} className={`event-indicator ${ev.type}`}>
                                {ev.title}
                            </div>
                        ))}
                    </div>
                    <button className="schedule-trigger" title="Schedule with Expert">+</button>
                </div>
            );
        }

        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="calendar-container">
            <div className="calendar-header-section">
                <h1>Pharma Expert Calendar</h1>
                <p className="calendar-subtitle">Visulize key milestones and schedule expert consultations.</p>
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

            {/* Booking Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Schedule Expert Session</h2>
                            <p className="modal-date">Selected Date: {selectedDate?.toDateString()}</p>
                        </div>

                        <form onSubmit={handleScheduleSubmit}>
                            <div className="form-group">
                                <label>Session Type</label>
                                <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
                                    <option value="consultation">1:1 Expert Consultation</option>
                                    <option value="regulatory">Regulatory Advisory</option>
                                    <option value="technical">Technical Review</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Topic / Notes</label>
                                <textarea placeholder="Briefly describe what you'd like to discuss..." rows="3"></textarea>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-confirm">Request Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
