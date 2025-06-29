import React from "react";

function Sidebar({ searchTerm, setSearchTerm, filteredSections, activeSection, setActiveSection }) {
  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
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
