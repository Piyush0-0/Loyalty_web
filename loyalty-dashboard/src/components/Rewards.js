import React from "react";

function Rewards({ rewardsList, points, handleClaim }) {
  return (
    <div className="rewards-grid">
      {rewardsList.map((reward) => (
        <div key={reward.id} className="reward-card">
          <h4>{reward.title}</h4>
          <p>{reward.cost} Points</p>
          <button
            className="claim-btn"
            onClick={() => handleClaim(reward.id)}
            disabled={points < reward.cost}
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rewards;
