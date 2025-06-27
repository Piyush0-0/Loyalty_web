import React from "react";

const Sidebar = ({ setSection }) => {
  return (
    <aside>
      <h2 className="logo">Loyalty</h2>
      <nav>
        <button onClick={() => setSection("home")}>Home</button>
        <button onClick={() => setSection("rewards")}>Rewards</button>
        <button onClick={() => setSection("store")}>Store</button>
        <button onClick={() => setSection("analytics")}>Analytics</button>
        <button onClick={() => setSection("history")}>History</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
