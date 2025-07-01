import React from "react";

function ChangeUser({ setActiveSection }) {
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="login-overlay" onClick={() => setActiveSection("User Setup")}>
      <div className="login-box" onClick={stopPropagation}>
        <button
          className="back-button glassy-btn"
          onClick={() => setActiveSection("User Setup")}
          style={{ marginBottom: "10px" }}
        >
          ← Back
        </button>

        <h2>Welcome Back</h2>
        <p>Please login to continue</p>

        <label>Email</label>
        <input type="email" placeholder="Enter email" className="login-input" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" className="login-input" />

        <button className="glassy-btn claim-btn">Login</button>
      </div>
    </div>
  );
}

export default ChangeUser;
