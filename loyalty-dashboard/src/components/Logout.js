import React from "react";

function Logout({ onConfirm, onCancel }) {
  return (
    <div className="logout-popup">
      <h3>Log Out?</h3>
      <div className="logout-buttons">
        <button className="glassy-btn" onClick={onConfirm}>Okay</button>
        <button className="glassy-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Logout;
