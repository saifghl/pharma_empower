import React from "react";
import "./About.css";

const Principles = () => {
    return (
        <div className="principles-section">
            <h2 className="section-title">Our Principles</h2>
            <div className="principles-list">
                <div className="principle-item">
                    <p>
                        We create an accessible and affordable one-stop platform that removes
                        barriers and gives every learner the freedom to grow and realise
                        their full potential.
                    </p>
                </div>
                <div className="principle-item">
                    <p>
                        We strengthen the talent pipeline through open knowledge and focused
                        skill development that empowers individuals to advance with clarity
                        and confidence.
                    </p>
                </div>
                <div className="principle-item">
                    <p>
                        We drive long-term impact by preparing professionals who elevate
                        patient care, support healthier communities, and shape a better
                        future for the industry.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Principles;
