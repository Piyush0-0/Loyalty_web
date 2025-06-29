import React from "react";

function Topbar({ username }) {
  return (
    <div className="topbar">
      <div className="username">{username}</div>
    </div>
  );
}

export default Topbar;
