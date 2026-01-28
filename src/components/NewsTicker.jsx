import React from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
    return (
        <div className="news-ticker-bar">
            <div className="ticker-content">
                <span className="ticker-item">
                    <span className="ticker-label">Pharma Pulse:</span>
                    USFDA Issues New Guidance on Data Integrity for Cloud-Based Systems.
                </span>
                <span className="ticker-item">
                    <span className="ticker-label">Clinical Update:</span>
                    Gene Therapy Shows Promising Phase II Results for Oncology.
                </span>
                <span className="ticker-item">
                    <span className="ticker-label">Upcoming Event:</span>
                    Webinar: Decoding USFDA's Latest Guidelines on Cleaning Validation. Register Now!
                </span>
                <span className="ticker-item">
                    <span className="ticker-label">Pharma Pulse:</span>
                    Stay Ahead of the Curve with Pharma Empower Solutions.
                </span>
            </div>
        </div>
    );
};

export default NewsTicker;
