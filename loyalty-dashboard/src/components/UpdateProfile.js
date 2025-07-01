import React, { useState } from "react";

function UpdateProfile() {
  const [name, setName] = useState("Piyush Samanta");
  const [email, setEmail] = useState("piyush@gmail.com");

  return (
    <div className="user-setup-form">
      <h2>Update Profile</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="glassy-btn claim-btn">Update</button>
    </div>
  );
}

export default UpdateProfile;
