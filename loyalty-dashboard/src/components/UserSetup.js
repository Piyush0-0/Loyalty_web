import React, { useState } from "react";

function UserSetup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Customer",
    theme: "Light",
    language: "English",
    notifications: true,
    location: "",
    subscription: "Free",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("User Saved:", formData);
    alert("User settings saved successfully!");
  };

  return (
    <div className="user-setup-form">
      <h2>User Setup</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Role:</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option>Customer</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Support</option>
        <option>Developer</option>
      </select>

      <label>Theme:</label>
      <select name="theme" value={formData.theme} onChange={handleChange}>
        <option>Light</option>
        <option>Dark</option>
      </select>

      <label>Preferred Language:</label>
      <select name="language" value={formData.language} onChange={handleChange}>
        <option>English</option>
        <option>Hindi</option>
        <option>Bengali</option>
        <option>Spanish</option>
        <option>French</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={formData.notifications}
          onChange={handleChange}
        />
        Enable Notifications
      </label>

      <label>Location:</label>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={formData.location}
        onChange={handleChange}
      />

      <label>Subscription Tier:</label>
      <select
        name="subscription"
        value={formData.subscription}
        onChange={handleChange}
      >
        <option>Free</option>
        <option>Silver</option>
        <option>Gold</option>
        <option>Platinum</option>
      </select>

      <button className="claim-btn" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}

export default UserSetup;
