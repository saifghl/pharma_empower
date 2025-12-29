import React, { useEffect, useState } from "react";
import { Trash2, Phone, User, CalendarDays, Clock, Search, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { sessionAPI } from "../../services/api";
import "./adminSession.css";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter(
        (session) =>
          session.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.phone?.includes(searchTerm) ||
          session.topic?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSessions(filtered);
    }
  }, [searchTerm, sessions]);

  const fetchSessions = async () => {
    try {
      const res = await sessionAPI.getAllSessions();
      setSessions(res.data);
      setFilteredSessions(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session request?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await sessionAPI.deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setFilteredSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete session");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (sessionDate) => {
    if (!sessionDate) return "gray";
    const date = new Date(sessionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return "red";
    if (date.toDateString() === today.toDateString()) return "blue";
    return "green";
  };

  const getStatusText = (sessionDate) => {
    if (!sessionDate) return "No date";
    const date = new Date(sessionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return "Past";
    if (date.toDateString() === today.toDateString()) return "Today";
    return "Upcoming";
  };

  if (loading) {
    return (
      <div className="admin-session-container">
        <div className="loading-container">
          <Loader2 className="spinner-icon" size={40} />
          <p>Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-session-container">
      <div className="admin-session-header">
        <div>
          <h1>Student Session Requests</h1>
          <p className="subtitle">
            Manage and review student session appointments
          </p>
        </div>
        <div className="session-stats">
          <div className="stat-card">
            <span className="stat-number">{sessions.length}</span>
            <span className="stat-label">Total Requests</span>
          </div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, phone, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>
            {searchTerm ? "No sessions found" : "No session requests yet"}
          </h3>
          <p>
            {searchTerm
              ? "Try adjusting your search terms"
              : "Student session requests will appear here"}
          </p>
        </div>
      ) : (
        <div className="session-card-grid">
          {filteredSessions.map((session) => {
            const statusColor = getStatusColor(session.session_date);
            const statusText = getStatusText(session.session_date);
            
            return (
              <div className="session-card" key={session.id}>
                <div className="session-card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <User size={20} />
                    </div>
                    <div>
                      <h3>{session.full_name || "Unknown"}</h3>
                      <span className={`status-badge status-${statusColor}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(session.id)}
                    title="Delete session"
                    disabled={deletingId === session.id}
                  >
                    {deletingId === session.id ? (
                      <Loader2 size={16} className="spinner-icon" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>

                <div className="session-card-body">
                  <div className="info-row">
                    <Phone size={16} />
                    <span>{session.phone || "Not provided"}</span>
                  </div>

                  <div className="info-row date-row">
                    <CalendarDays size={16} />
                    <div>
                      <span className="date-label">Session Date:</span>
                      <span className="date-value">
                        {session.session_date || "Not scheduled"}
                      </span>
                    </div>
                  </div>

                  {session.created_at && (
                    <div className="info-row">
                      <Clock size={16} />
                      <span className="created-at">
                        Requested: {session.created_at}
                      </span>
                    </div>
                  )}

                  <div className="topic-section">
                    <div className="topic-header">
                      <MessageSquare size={16} />
                      <span>Session Topic</span>
                    </div>
                    <p className="topic-text">{session.topic || "No topic provided"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminSessions;
