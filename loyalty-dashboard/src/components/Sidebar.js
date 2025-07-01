import React, { useState } from "react";

function Sidebar({
  searchTerm,
  setSearchTerm,
  activeSection,
  setActiveSection,
  filteredSections,
}) {
  const [userSetupOpen, setUserSetupOpen] = useState(false);

  const handleSectionClick = (item) => {
    if (item === "User Setup") {
      setUserSetupOpen((prev) => !prev);
    } else {
      setActiveSection(item);
    }
  };

  const userSetupOptions = ["Change User", "Update Profile", "Logout"];

  return (
    <div className="sidebar">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {Object.entries(filteredSections).map(([section, items]) => (
        <div key={section}>
          <div className="menu-header">{section}</div>
          {items.map((item) => (
            <React.Fragment key={item}>
              <div
                className={`menu-item glassy-btn ${activeSection === item ? "active" : ""}`}
                onClick={() => handleSectionClick(item)}
              >
                {item}
              </div>
              {item === "User Setup" && userSetupOpen && (
                <div className="dropdown-container">
                  {userSetupOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`menu-item glassy-btn sub-option ${
                        activeSection === opt ? "active" : ""
                      }`}
                      onClick={() => setActiveSection(opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
