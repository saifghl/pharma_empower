import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // ✅ AUTH CHECK (single login system)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user || user.role !== 'admin') {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.clear(); // ✅ clear everything
        navigate('/login');
    };

    return (
        <div className="admin-container">
            {/* Mobile Toggle Button */}
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Admin Panel</h2>

                <nav className="sidebar-nav">
                    <NavLink to="/admin/dashboard" className="sidebar-link">
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/enquiries" className="sidebar-link">
                        Enquiries
                    </NavLink>

                    <NavLink to="/admin/sessions" className="sidebar-link">
                        Sessions
                    </NavLink>

                    <NavLink to="/admin/notifications" className="sidebar-link">
                        Notifications
                    </NavLink>

                    <NavLink to="/admin/content" className="sidebar-link">
                        Content
                    </NavLink>
                    <NavLink
                        to="/admin/chat-enquiries"
                        className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        Chat Queries
                    </NavLink>

                    <NavLink to="/admin/access-control" className="sidebar-link">
                        Access Control
                    </NavLink>

                    <NavLink to="/admin/events-control" className="sidebar-link">
                        Events Control
                    </NavLink>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                        <button
                            onClick={handleLogout}
                            className="sidebar-link"
                            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                        >
                            Logout
                        </button>

                        <NavLink to="/" className="sidebar-link" style={{ fontSize: '0.9rem' }}>
                            ← Back to Site
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main
                className="admin-content"
                onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
