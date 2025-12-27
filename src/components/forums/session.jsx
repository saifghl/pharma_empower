import React, { useState } from "react";
import "./studentSession.css";

const StudentSession = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    topic: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, topic, date, time } = formData;

    if (!fullName || !email || !topic || !date || !time) {
      alert("All fields are required");
      return;
    }

    console.log("Session Request:", formData);

    // 🔗 Later connect backend
    // await sessionAPI.createSession(formData);

    alert("Session request submitted successfully");

    setFormData({
      fullName: "",
      email: "",
      topic: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="session-container">
      <div className="session-card">
        <h2>Request a Session</h2>

        <form onSubmit={handleSubmit} className="session-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="topic"
            placeholder="Why do you need this session?"
            rows="3"
            value={formData.topic}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StudentSession;
