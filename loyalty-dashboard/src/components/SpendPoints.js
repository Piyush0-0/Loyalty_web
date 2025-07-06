import React, { useState } from "react";
import "../App.css";

function SpendPoints({ spendList, points, handleSpend }) {
  const [spentItems, setSpentItems] = useState([]);
  const [ashButtons, setAshButtons] = useState([]);
  const [ashCards, setAshCards] = useState([]);

  if (!Array.isArray(spendList)) return <p>Loading...</p>;

  const handleAnimatedSpend = (id) => {
    if (spentItems.includes(id)) return;
    setAshButtons((prev) => [...prev, id]);
    setTimeout(() => setAshCards((prev) => [...prev, id]), 300);
    setTimeout(() => {
      setSpentItems((prev) => [...prev, id]);
      handleSpend(id);
    }, 800);
  };

  const productIcons = {
    Notebook: "📓",
    Pen: "🖊️",
    Headphones: "🎧",
    "T-shirt": "👕",
  };

  return (
    <div className="rewards-grid" style={{ width: "100%", padding: "10px", display: "flex", flexDirection: "column", gap: "15px" }}>
      {spendList.map((item) => {
        const isSpent = spentItems.includes(item.id);
        const isAshCard = ashCards.includes(item.id);
        const isAshButton = ashButtons.includes(item.id);
        const icon = productIcons[item.title] || "🛍️";
        const insufficient = points < item.cost;

        if (isSpent) return null;

        return (
          <div
            key={item.id}
            className={`card reward-row ${isAshCard ? "fadeToAshes" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              background: "#e3eaf4",
              border: "1px solid #d0d8e2",
              color: "#1a237e",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>{icon} {item.title}</div>
              <div>{item.cost} Points</div>
            </div>

            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
              Redeemable Item
            </div>

            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              {insufficient ? (
                <div style={{
                  color: "crimson",
                  fontWeight: "bold",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  backgroundColor: "#fce4ec",
                }}>
                  Not enough points
                </div>
              ) : (
                <button
                  className={`claim-btn ${isAshButton ? "fadeToAshes" : ""}`}
                  onClick={() => handleAnimatedSpend(item.id)}
                  disabled={isAshButton}
                  style={{
                    background: "#c62828",
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
                  {!isAshButton && "Spend"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SpendPoints;
