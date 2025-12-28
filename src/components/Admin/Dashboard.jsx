import React from 'react';

const Dashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="admin-card">
                    <h3>Total Enquiries</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>12</p>
                    <p style={{ color: '#666' }}>+2 today</p>
                </div>

                <div className="admin-card">
                    <h3>Active Students</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>85</p>
                    <p style={{ color: '#666' }}>Across all courses</p>
                </div>

                <div className="admin-card">
                    <h3>Forum Discussions</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>34</p>
                    <p style={{ color: '#666' }}>5 new replies</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
