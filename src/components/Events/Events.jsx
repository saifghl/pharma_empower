import React, { useState } from 'react';
import { MapPin, Calendar, Tag, ExternalLink, Search } from 'lucide-react';
import './Events.css';
import { initialEvents } from './eventsData';

const Events = () => {
    const [events] = useState(initialEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(events.map(event => event.category))];

    // Filter events
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.venue.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="events-section">
            <div className="events-hero">
                <div className="hero-content">
                    <h1>Global Pharma Events 2025</h1>
                    <p>Connect, Collaborate, and Innovate at the world's leading pharmaceutical conferences and exhibitions.</p>
                </div>
            </div>

            <div className="events-controls">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search events, venues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                            onClick={() => setFilterCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="events-grid">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="card-header">
                                <span className={`category-tag ${event.category.includes('Conference') ? 'conf' : 'exhib'}`}>
                                    {event.category}
                                </span>
                            </div>
                            <div className="card-body">
                                <h3>{event.name}</h3>

                                <div className="event-detail">
                                    <Calendar size={18} className="icon" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="event-detail">
                                    <MapPin size={18} className="icon" />
                                    <span>{event.venue}</span>
                                </div>

                                <div className="reg-info">
                                    <Tag size={16} className="icon-small" />
                                    <span className="deadline-text">Reg Deadline: {event.last_date_reg}</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <a
                                    href={event.reg_link.startsWith('http') ? event.reg_link : `https://${event.reg_link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="register-btn"
                                >
                                    Register Now <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <h3>No events found matching your criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
