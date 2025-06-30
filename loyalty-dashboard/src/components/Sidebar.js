import React from "react";

function Sidebar({ searchTerm, setSearchTerm, activeSection, setActiveSection, filteredSections }) {
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
            <div
              key={item}
              className={`menu-item ${activeSection === item ? "active" : ""}`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
