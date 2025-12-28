import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Check for "Auth"
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
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
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setIsSidebarOpen(false)}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/enquiries" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setIsSidebarOpen(false)}>
                        Enquiries
                    </NavLink>
                    <NavLink to="/admin/cms" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={() => setIsSidebarOpen(false)}>
                        Website Content
                    </NavLink>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                        <button onClick={handleLogout} className="sidebar-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                            Logout
                        </button>
                        <NavLink to="/" className="sidebar-link" style={{ fontSize: '0.9rem' }}>
                            &larr; Back to Site
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="admin-content" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
