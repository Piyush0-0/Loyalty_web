import React from "react";

function ChangeUser() {
  return (
    <div className="login-overlay">
      <div className="login-box">
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
