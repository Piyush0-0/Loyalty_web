import React, { useState, useEffect } from "react";
import "../App.css";

function Rewards({ rewardsList, points, handleClaim }) {
  const [ashButtons, setAshButtons] = useState([]);
  const [ashCards, setAshCards] = useState([]);
  const [expiryTimes, setExpiryTimes] = useState({});
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const initialExpiry = {};
    rewardsList.forEach((reward) => {
      const minutes = 30 + Math.floor(Math.random() * 60);
      initialExpiry[reward.id] = Date.now() + minutes * 60 * 1000;
    });
    setExpiryTimes(initialExpiry);
  }, [rewardsList]);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = {};
      Object.entries(expiryTimes).forEach(([id, endTime]) => {
        const diff = endTime - Date.now();
        if (diff <= 0) {
          updated[id] = { text: "Expired", urgent: false };
        } else {
          const seconds = Math.floor(diff / 1000) % 60;
          const minutes = Math.floor(diff / (1000 * 60)) % 60;
          const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          updated[id] = {
            text: `Expires in: ${days}d:${hours}h:${minutes}m:${seconds}s`,
            urgent: diff < 86400000,
          };
        }
      });
      setTimeLeft(updated);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryTimes]);

  const handleAnimatedClaim = (id) => {
    if (ashButtons.includes(id)) return;

    setAshButtons((prev) => [...prev, id]);

    setTimeout(() => {
      setAshCards((prev) => [...prev, id]);
    }, 1000);

    setTimeout(() => {
      handleClaim(id); // triggers removal in App.js
    }, 2000);
  };

  const rowColors = ["#fce4ec", "#e3f2fd", "#e8f5e9", "#fff3e0"];

  return (
    <div
      className="rewards-grid"
      style={{
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {rewardsList.map((reward, index) => {
        const isAshCard = ashCards.includes(reward.id);
        const isAshButton = ashButtons.includes(reward.id);
        const timer = timeLeft[reward.id];
        const isUrgent = timer?.urgent;

        return (
          <div
            key={reward.id}
            className={`reward-row ${isAshCard ? "fadeCardOut" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: rowColors[index % rowColors.length],
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "96%",
              position: "relative",
              transition: "all 0.4s ease",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#222",
              minHeight: "110px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {reward.title}
              </div>
              <div>{reward.cost} Points</div>
            </div>

            <div
              style={{
                flex: 1,
                textAlign: "center",
                color: isUrgent ? "#d32f2f" : "#000",
                fontWeight: "bold",
                animation: isUrgent ? "pulseText 1.2s infinite" : "none",
              }}
            >
              {timer ? timer.text : "Expires in: --"}
            </div>

            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <button
                className={`claim-btn ${isAshButton ? "fadeToAshes" : ""}`}
                onClick={() => handleAnimatedClaim(reward.id)}
                disabled={points < reward.cost || isAshButton}
                style={{
                  background: "#1565c0",
                  border: "none",
                  color: "#fff",
                  padding: "6px 10px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  minWidth: "72px",
                }}
              >
                {!isAshButton && "Claim"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Rewards;
