import React, { useState } from "react";
import Tilt from "react-parallax-tilt";

function SpendPoints({ spendList, points, handleSpend }) {
  const [spent, setSpent] = useState([]);

  const handleAnimatedSpend = (id) => {
    if (spent.includes(id)) return;

    setSpent((prev) => [...prev, id]);

    setTimeout(() => {
      handleSpend(id);
    }, 2000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Spend Your Points</h2>
      <div className="rewards-grid">
        {spendList.map((item, index) => {
          const isSpent = spent.includes(item.id);
          return (
            <Tilt
              key={item.id}
              glareEnable={true}
              glareMaxOpacity={0.3}
              scale={1.05}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              className={`tilt-card ${isSpent ? "disappear" : ""}`}
              style={{
                background: ["#FFF0F0", "#F0FFF0", "#F0F4FF", "#FFFBE0"][index % 4],
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                transition: "all 0.6s ease",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                width: "220px",
                position: "relative",
              }}
            >
              <h4 style={{ margin: "0 0 10px", fontSize: "18px" }}>{item.title}</h4>
              <p style={{ margin: "0 0 20px", fontWeight: "bold" }}>Cost: {item.cost} points</p>
              <button
                className="claim-btn"
                onClick={() => handleAnimatedSpend(item.id)}
                disabled={points < item.cost || isSpent}
              >
                {isSpent ? "Purchased!" : points < item.cost ? "Not Enough Points" : "Spend"}
              </button>

              {isSpent && (
                <div className="popup-overlay">
                  🎉 Purchased!
                </div>
              )}
            </Tilt>
          );
        })}
      </div>
    </div>
  );
}

export default SpendPoints;
