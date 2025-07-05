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

    setTimeout(() => {
      setAshCards((prev) => [...prev, id]);
    }, 1000);

    setTimeout(() => {
      setSpentItems((prev) => [...prev, id]);
      handleSpend(id);
    }, 2000);
  };

  const rowColors = ["#fce4ec", "#e3f2fd", "#e8f5e9", "#fff3e0"];
  const productIcons = {
    Notebook: "📓",
    Pen: "🖊️",
    Headphones: "🎧",
    "T-shirt": "👕",
  };

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
      {spendList.map((item, index) => {
        const isSpent = spentItems.includes(item.id);
        const isAshCard = ashCards.includes(item.id);
        const isAshButton = ashButtons.includes(item.id);
        const icon = productIcons[item.title] || "🛍️";
        const insufficient = points < item.cost;

        if (isSpent) return null;

        return (
          <div
            key={item.id}
            className={`reward-row ${isAshCard ? "fadeCardOut" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: rowColors[index % rowColors.length],
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              position: "relative",
              transition: "all 0.4s ease",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#222",
              opacity: isAshCard ? 0 : 1,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {icon} {item.title}
              </div>
              <div>{item.cost} Points</div>
            </div>

            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
              Redeemable Item
            </div>

            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              {insufficient ? (
                <div
                  style={{
                    color: "crimson",
                    fontWeight: "bold",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    backgroundColor: "#fce4ec",
                  }}
                >
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
