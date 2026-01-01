import React, { useEffect, useState } from "react";
import { Trash2, Phone, User, CalendarDays, Clock } from "lucide-react";
import { sessionAPI } from "../../services/api";
import "./adminSession.css";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteSession=async (id)=>{
    console.log("delete session function is running");
    try{
      await sessionAPI.deleteSession(id);
      fetchSessions();
    }catch(err){
        console.log(err.message);
    }
    
  }



  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await sessionAPI.getAllSessions();
      setSessions(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load sessions");
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
    } catch (error) {
      console.error(error);
      alert("Failed to delete session");
    }
  };

  if (loading) {
    return <div className="loading">Loading sessions...</div>;
  }

  return (
    <div className="admin-session-container">
      <h2>Student Session Requests</h2>

      {sessions.length === 0 ? (
        <p className="empty">No session requests found</p>
      ) : (
        <div className="session-card-grid">
          {sessions.map((session) => (
            <div className="session-card" key={session.id}>
              {/* Header */}
              <div className="session-card-header">
                <h3>
                  <User size={16} /> {session.full_name}
                </h3>

                <button
                  className="delete-btn"
                  onClick={() => deleteSession(session.id)}
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
                  <CalendarDays size={14} />


                  {session.session_date || "—"}
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
