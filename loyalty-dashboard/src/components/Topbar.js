import React, { useState } from "react";
import TierPopup from "./TierPopup";

function Topbar({ username, totalEarnedPoints, setActiveSection }) {
  const [showTierInfo, setShowTierInfo] = useState(false);

  const getTierInfo = (points) => {
    if (points > 3500) return { tier: "Diamond", next: null };
    if (points > 2000) return { tier: "Platinum", next: 3500 };
    if (points > 1000) return { tier: "Gold", next: 2000 };
    if (points > 500) return { tier: "Silver", next: 1000 };
    return { tier: "Bronze", next: 500 };
  };

  const { tier, next } = getTierInfo(totalEarnedPoints);

  return (
    <div
      className="topbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 30px",
        alignItems: "center",
        height: "10%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div className="username" style={{ fontWeight: "bold", fontSize: "16px" }}>
        {username}
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setShowTierInfo(true)}
      >
        <div style={{ fontWeight: "bold" }}>
          {totalEarnedPoints} pts
        </div>
        <div
          style={{
            background: "gold",
            color: "black",
            padding: "5px 12px",
            borderRadius: "16px",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          {tier}
        </div>
      </div>

      {showTierInfo && (
        <TierPopup
          tier={tier}
          points={totalEarnedPoints}
          nextTierPoints={next}
          onClose={() => setShowTierInfo(false)}
          setActiveSection={setActiveSection}
        />
      )}
    </div>
  );
}

export default Topbar;
