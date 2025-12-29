import React, { useState } from "react";
import {
  Calendar,
  User,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import "./studentSession.css";
import { sessionAPI } from "../../services/api";

const StudentSession = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    topic: "",
    date: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { fullName, topic, date, phone } = formData;

    if (!fullName || !topic || !date || !phone) {
      setError("All fields are required");
      return;
    }

    // Validate phone number
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    // Validate date (should not be in the past)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Please select a future date");
      return;
    }

    setLoading(true);

    try {
      const res = await sessionAPI.createSession(formData);
      console.log(res.data);
      if (res.data?.message || res.message) {
        setSuccess(true);
        setFormData({
          fullName: "",
          topic: "",
          date: "",
          phone: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
          "Failed to submit session request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="session-container">
      <div className="session-wrapper">
        <div className="session-header">
          <h1>Book a Session</h1>
          <p>Schedule a one-on-one session with our experts</p>
        </div>

        <div className="session-card">
          {success && (
            <div className="success-message">
              <CheckCircle2 size={20} />
              <span>
                Session request submitted successfully! We'll get back to you
                soon.
              </span>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="session-form">
            <div className="form-group">
              <label htmlFor="fullName">
                <User size={18} />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={18} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">
                <Calendar size={18} />
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="topic">
                <MessageSquare size={18} />
                Session Topic / Reason
              </label>
              <textarea
                id="topic"
                name="topic"
                placeholder="Tell us why you need this session and what you'd like to discuss..."
                rows="4"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Session Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSession;
