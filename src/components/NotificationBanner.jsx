import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar } from 'lucide-react';
import './NotificationBanner.css';

const NotificationBanner = () => {
    const [notifications, setNotifications] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Load notifications from local storage
    useEffect(() => {
        const loadNotifications = () => {
            const saved = localStorage.getItem('pharma_notifications');
            if (saved) {
                setNotifications(JSON.parse(saved));
            }
        };

        loadNotifications();

        // Poll for changes every 2 seconds (since we don't have a real backend/websocket)
        const interval = setInterval(loadNotifications, 2000);
        return () => clearInterval(interval);
    }, []);

    // Cycle through notifications if there are multiple
    useEffect(() => {
        if (notifications.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % notifications.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [notifications.length]);

    if (!isVisible || notifications.length === 0) return null;

    const currentNote = notifications[currentIndex];

    return (
        <div className={`notification-banner ${currentNote.type}`}>
            <div className="banner-content">
                <div className="banner-icon">
                    <Bell size={18} />
                </div>
                <div className="banner-text">
                    <span className="banner-tag">{currentNote.type}</span>
                    <span className="banner-message">
                        <strong>{currentNote.title}:</strong> {currentNote.message}
                    </span>
                    {currentNote.date && (
                        <span className="banner-date">
                            <Calendar size={14} style={{ marginBottom: -2, marginRight: 4 }} />
                            {currentNote.date}
                        </span>
                    )}
                </div>
            </div>

            <div className="banner-controls">
                {notifications.length > 1 && (
                    <div className="banner-dots">
                        {notifications.map((_, idx) => (
                            <span
                                key={idx}
                                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </div>
                )}
                <button className="close-banner" onClick={() => setIsVisible(false)}>
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default NotificationBanner;
