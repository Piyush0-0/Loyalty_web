import React, { useState, useRef } from "react";

function UpdateProfile() {
  const [name, setName] = useState("Piyush");
  const [email, setEmail] = useState("piyush@gmail.com");
  const [bio, setBio] = useState("Full-stack enthusiast exploring rewards tech and gamified loyalty systems.");
  const [pronouns, setPronouns] = useState("Don't specify");
  const [url, setUrl] = useState("https://Loyalty-dashboard.in/piyush");
  const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/150?img=3");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    const profileData = {
      name,
      email,
      bio,
      pronouns,
      url,
      profilePic,
    };
    console.log("Profile Saved:", profileData);
    alert("Profile updated!");
    // TODO: send `profileData` to backend
  };

  const containerStyle = {
    padding: "30px",
    backgroundColor: "#0d1117",
    color: "#f0f6fc",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    maxWidth: "900px",
    margin: "20px auto",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const sectionStyle = {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  };

  const formStyle = {
    flex: 2,
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginTop: "15px",
    color: "#c9d1d9",
  };

  const inputStyle = {
    background: "#161b22",
    color: "#f0f6fc",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #30363d",
    borderRadius: "6px",
    fontSize: "14px",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "none",
  };

  const selectStyle = {
    ...inputStyle,
  };

  const buttonStyle = {
    marginTop: "25px",
    padding: "10px 20px",
    background: "rgba(100, 100, 255, 0.2)",
    border: "1px solid #58a6ff",
    color: "#58a6ff",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const profilePicSectionStyle = {
    flex: 1,
    textAlign: "center",
    position: "relative",
  };

  const profilePicStyle = {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "3px solid #30363d",
    objectFit: "cover",
  };

  const editBtnStyle = {
    marginTop: "10px",
    background: "transparent",
    border: "1px solid #30363d",
    color: "#58a6ff",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    borderBottom: "1px solid #30363d",
    paddingBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Public Profile</h2>

      <div style={sectionStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Bio:</label>
          <textarea
            placeholder="Tell us a little bit about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={textareaStyle}
          />

          <label style={labelStyle}>Pronouns:</label>
          <select
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            style={selectStyle}
          >
            <option>Don't specify</option>
            <option>He/Him</option>
            <option>She/Her</option>
            <option>They/Them</option>
          </select>

          <label style={labelStyle}>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            style={inputStyle}
          />

          <button style={buttonStyle} onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>

        <div style={profilePicSectionStyle}>
          <img src={profilePic} alt="Profile" style={profilePicStyle} />
          <button
            style={editBtnStyle}
            onClick={() => fileInputRef.current.click()}
          >
            Edit
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
