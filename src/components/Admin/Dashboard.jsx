import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        todayEnquiries: 0,
        activeStudents: 0,
        totalSessions: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await dashboardAPI.getStats();
            const data = res.data;

            setStats({
                totalEnquiries: data.totalEnquiries ?? 0,
                todayEnquiries: data.todayEnquiries ?? 0,
                activeStudents: data.activeStudents ?? 0,
                totalSessions: data.totalSessions ?? 0
            });
        } catch (err) {
            console.error('Dashboard load failed', err);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin.</p>
            </header>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                }}
            >
                <div className="admin-card">
                    <h3>Total Enquiries</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {stats.totalEnquiries}
                    </p>
                    <p>+{stats.todayEnquiries} today</p>
                </div>

                <div className="admin-card">
                    <h3>Active Students</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {stats.activeStudents}
                    </p>
                    <p>Registered users</p>
                </div>

                <div className="admin-card">
                    <h3>Total Sessions</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {stats.totalSessions}
                    </p>
                    <p>Booked sessions</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
