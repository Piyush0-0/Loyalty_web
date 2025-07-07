import React from "react";

function TierPopup({ tier, points, nextTierPoints, onClose, setActiveSection }) {
  const tierColors = {
    Bronze: "#cd7f32",
    Silver: "#b0c4de",
    Gold: "#f1c40f",
    Platinum: "#e5e4e2",
    Diamond: "#00f0ff",
  };

  const tierBadge = {
    Bronze: "🥉",
    Silver: "🥈",
    Gold: "🥇",
    Platinum: "💎",
    Diamond: "🔷",
  };

  const progressPercent = nextTierPoints ? Math.min((points / nextTierPoints) * 100, 100) : 100;

  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: `linear-gradient(to bottom right, ${tierColors[tier]}33, #ffffff20)`,
        padding: "30px 40px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
        zIndex: 1000,
        textAlign: "center",
        width: "350px",
        backdropFilter: "blur(12px)",
        border: `2px solid ${tierColors[tier]}`,
        color: "#111",
      }}
    >
      <div
        className="tier-badge-glow"
        style={{
          display: "inline-block",
          padding: "16px",
          borderRadius: "50%",
          backgroundColor: "#111",
          boxShadow: `0 0 20px ${tierColors[tier]}, 0 0 40px ${tierColors[tier]}55`,
          animation: "pulseGlow 2s infinite ease-in-out",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "28px" }}>
          {tierBadge[tier]}
        </h2>
      </div>

      <h2 style={{ margin: "10px 0 5px" }}>{tier} Tier</h2>
      <p style={{ fontWeight: "bold" }}>Total Points: {points}</p>
      {nextTierPoints && (
        <p style={{ fontSize: "14px" }}>
          {nextTierPoints - points} points to unlock next tier
        </p>
      )}

      <div
        style={{
          position: "relative",
          height: "14px",
          background: "#2a2a2a55",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "15px 0",
          boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundImage: `linear-gradient(
              135deg,
              ${tierColors[tier]} 25%,
              #ffffff 50%,
              ${tierColors[tier]} 75%
            )`,
            backgroundSize: "200% 100%",
            animation: "laserFlow 2s linear infinite",
            borderRadius: "10px",
            boxShadow: `0 0 10px ${tierColors[tier]}, 0 0 18px ${tierColors[tier]}`,
          }}
        />
      </div>

      <button
        onClick={() => {
          setActiveSection("Rewards");
          onClose();
        }}
        style={{
          padding: "10px 20px",
          marginTop: "15px",
          background: "#ffcc00",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Earn Points
      </button>

      <div style={{ marginTop: 15 }}>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#111",
            cursor: "pointer",
            fontSize: "13px",
            textDecoration: "underline",
          }}
        >
          Close
        </button>
      </div>

      <style>
        {`
          @keyframes laserFlow {
            0% { background-position: 0% 0; }
            100% { background-position: 200% 0; }
          }

          @keyframes pulseGlow {
            0% {
              box-shadow: 0 0 10px ${tierColors[tier]}, 0 0 20px ${tierColors[tier]}55;
            }
            50% {
              box-shadow: 0 0 25px ${tierColors[tier]}, 0 0 45px ${tierColors[tier]}aa;
            }
            100% {
              box-shadow: 0 0 10px ${tierColors[tier]}, 0 0 20px ${tierColors[tier]}55;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TierPopup;
