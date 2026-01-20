import React, { useEffect, useState } from "react";
import { Trash2, Phone, User, CalendarDays, Clock, Search } from "lucide-react";
import { sessionAPI } from "../../services/api";
import "./adminSession.css";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await sessionAPI.getAllSessions();
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setError("Failed to load sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmDelete) return;

    try {
      await sessionAPI.deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete session:", err);
      alert("Failed to delete session. Please try again.");
    }
  };

  const filteredSessions = sessions.filter(session =>
    session.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.phone.includes(searchTerm)
  );

  if (loading) {
    return <div className="loading">Loading sessions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;  // Add .error class to CSS if needed
  }

  return (
    <div className="admin-session-container">
      <h2>Student Session Requests</h2>

      {/* Search Bar */}
      <div className="search-bar" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '8px 12px', background: '#f9f9f9' }}>
        <Search size={16} />
        <input
          type="text"
          placeholder="Search by name, topic, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', marginLeft: '8px', flex: 1, fontSize: '14px' }}
        />
      </div>

      {filteredSessions.length === 0 ? (
        <p className="empty">No session requests found</p>
      ) : (
        <div className="session-card-grid">
          {filteredSessions.map((session) => (
            <div className="session-card" key={session.id}>
              {/* Header */}
              <div className="session-card-header">
                <h3>
                  <User size={16} /> {session.full_name}
                </h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(session.id)}
                  title="Delete session"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="session-card-body">
                <p>
                  <Phone size={14} /> {session.phone}
                </p>
                <p className="topic">{session.topic}</p>
                <p className="meta">
                  <CalendarDays size={14} /> {session.session_date || "—"}
                </p>
                <p className="meta">
                  <Clock size={14} /> {session.created_at}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSessions;