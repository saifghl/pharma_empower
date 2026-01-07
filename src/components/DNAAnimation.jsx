import React from 'react';
import '../App.css'; // Ensure it has access to global styles

const DNAAnimation = () => {
    // DNA Rings Generation for Background
    const dnaRings = Array.from({ length: 20 }).map((_, i) => (
        <div
            key={i}
            className="nucleotide"
            style={{
                top: `${i * 30}px`,
                transform: `rotateY(${i * 30}deg)`
            }}
        />
    ));

    return (
        <div className="dna-graphics">
            <div className="dna-container">
                <div className="dna-strand">
                    {dnaRings}
                </div>
            </div>
        </div>
    );
};

export default DNAAnimation;
