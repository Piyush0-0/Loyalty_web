import React from "react";

function Settings() {
  return (
    <div className="form-area">
      <h2>Settings</h2>
      <label>Theme:</label>
      <select>
        <option>Light</option>
        <option>Dark</option>
      </select>
      <button className="claim-btn">Apply</button>
    </div>
  );
}

export default Settings;
