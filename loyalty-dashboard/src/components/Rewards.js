import React, { useState } from "react";
import Tilt from "react-parallax-tilt";

function Rewards({ rewardsList, points, handleClaim }) {
  const [claimed, setClaimed] = useState([]);

  const handleAnimatedClaim = (id) => {
    if (claimed.includes(id)) return;

    setClaimed((prev) => [...prev, id]);

    setTimeout(() => {
      handleClaim(id);
    }, 2000); // Animation duration
  };

  return (
    <div className="rewards-grid">
      {rewardsList.map((reward, index) => {
        const isClaimed = claimed.includes(reward.id);
        return (
          <Tilt
            key={reward.id}
            glareEnable={true}
            glareMaxOpacity={0.3}
            scale={1.05}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className={`tilt-card ${isClaimed ? "disappear" : ""}`}
            style={{
              background: ["#FFE0E0", "#E0FFE0", "#E0E8FF", "#FFF9D9"][index % 4],
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              transition: "all 0.6s ease",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              width: "220px",
              position: "relative",
            }}
          >
            <h4 style={{ margin: "0 0 10px", fontSize: "18px" }}>{reward.title}</h4>
            <p style={{ margin: "0 0 20px", fontWeight: "bold" }}>{reward.cost} Points</p>
            <button
              className="claim-btn"
              onClick={() => handleAnimatedClaim(reward.id)}
              disabled={points < reward.cost || isClaimed}
            >
              {isClaimed ? "Claimed!" : "Claim"}
            </button>

            {isClaimed && (
              <div className="popup-overlay">
                🎉 Claimed!
              </div>
            )}
          </Tilt>
        );
      })}
    </div>
  );
}

export default Rewards;
