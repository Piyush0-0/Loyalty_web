import React, { useState } from "react";

function Settings({ theme, setTheme }) {
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("Medium");
  const [language, setLanguage] = useState("English");

  const containerStyle = {
    backgroundColor: theme === "Dark" ? "#1e1e1e" : "#fff",
    color: theme === "Dark" ? "#fff" : "#000",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "8px",
  };

  const inputStyle = {
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: theme === "Dark" ? "#2b2b2b" : "#fff",
    color: theme === "Dark" ? "#fff" : "#000",
  };

  const toggleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#d32f2f",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "30px" }}>App Settings</h2>

      {/* Theme Selection */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Theme:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} style={inputStyle}>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>

      {/* Font Size */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Font Size:</label>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={inputStyle}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>

      {/* Language */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* Notifications */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Notifications:</label>
        <div style={toggleStyle}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <span>{notifications ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Danger zone */}
      <button style={buttonStyle}>Delete Account</button>
    </div>
  );
}

export default Settings;
