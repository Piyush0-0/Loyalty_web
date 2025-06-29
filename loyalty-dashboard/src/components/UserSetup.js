import React from "react";

function UserSetup() {
  return (
    <div className="form-area">
      <h2>User Setup</h2>
      <label>Name:</label>
      <input type="text" placeholder="Enter name" />
      <label>Email:</label>
      <input type="email" placeholder="Enter email" />
      <button className="claim-btn">Save</button>
    </div>
  );
}

export default UserSetup;
