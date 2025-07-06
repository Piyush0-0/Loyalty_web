// Home.js
import React from "react";
import "../App.css";

function Home({ summary, recentActivity }) {
  const totalEarned = recentActivity.offers.reduce((sum, t) => sum + t.points, 0);
  const totalSpent = recentActivity.spent.reduce((sum, t) => sum + Math.abs(t.points), 0);
  const totalRedeemed = recentActivity.rewards.reduce((sum, t) => sum + Math.abs(t.points), 0);

  const chartEarnSpend = encodeURIComponent(JSON.stringify({
    type: "bar",
    data: {
      labels: ["Earned", "Spent"],
      datasets: [
        {
          label: "Points",
          data: [totalEarned, totalSpent],
          backgroundColor: ["#4caf50", "#f44336"],
        },
      ],
    },
  }));

  const chartDistribution = encodeURIComponent(JSON.stringify({
    type: "doughnut",
    data: {
      labels: ["Earned", "Spent", "Redeemed"],
      datasets: [
        {
          data: [totalEarned, totalSpent, totalRedeemed],
          backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        },
      ],
    },
  }));

  const sortedPoints = [...recentActivity.offers, ...recentActivity.spent, ...recentActivity.rewards]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-6);

  const chartPointsOverTime = encodeURIComponent(JSON.stringify({
    type: "line",
    data: {
      labels: sortedPoints.map((t) => t.date),
      datasets: [
        {
          label: "Points",
          data: sortedPoints.map((t) => t.points),
          fill: true,
          borderColor: "#3f51b5",
          backgroundColor: "rgba(63,81,181,0.1)",
        },
      ],
    },
  }));

  return (
    <div className="dashboard">
      {/* Summary Row */}
      <div className="summary-row">
        <div className="summary-block">
          <h4>Total Points</h4>
          <p className="summary-value">{summary.pointsEarned || 0}</p>
          <span className="summary-subtext">Your current balance</span>
        </div>
        <div className="summary-block">
          <h4>Offers Completed</h4>
          <p className="summary-value">{summary.offersCompleted}</p>
          <span className="summary-subtext">Earned rewards</span>
        </div>
        <div className="summary-block">
          <h4>Rewards Redeemed</h4>
          <p className="summary-value">{summary.rewardsGiven}</p>
          <span className="summary-subtext">Used your points</span>
        </div>
        <div className="summary-block">
          <h4>Items Purchased</h4>
          <p className="summary-value">{summary.spentItems}</p>
          <span className="summary-subtext">Spent through loyalty</span>
        </div>
      </div>

      {/* Recent Transactions (Tabular View with Alternating Colors) */}
      <div className="metrics-box">
        <h4 style={{ marginBottom: "15px" }}>Recent Transactions</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#e0e7ff", textAlign: "left" }}>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Title</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Points</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...recentActivity.offers, ...recentActivity.rewards, ...recentActivity.spent]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map((entry, index) => {
                const formattedDate = new Date(entry.date).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                });

                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f8f9fc" : "#ffffff",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: "10px" }}>{entry.title}</td>
                    <td style={{ padding: "10px", color: entry.points > 0 ? "#4caf50" : "#f44336" }}>
                      {entry.points > 0 ? "+" : ""}
                      {entry.points} pts
                    </td>
                    <td style={{ padding: "10px", fontSize: "13px", color: "#555" }}>
                      {formattedDate}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="three-column-grid">
        <div className="card analysis-box">
          <h4>Earned vs Spent Points</h4>
          <img
            src={`https://quickchart.io/chart?c=${chartEarnSpend}`}
            alt="Earn vs Spend"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
        <div className="card analysis-box">
          <h4>Activity Distribution</h4>
          <img
            src={`https://quickchart.io/chart?c=${chartDistribution}`}
            alt="Distribution"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
        <div className="card">
          <h4>Points Over Time</h4>
          <img
            src={`https://quickchart.io/chart?c=${chartPointsOverTime}`}
            alt="Points Over Time"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
      </div>

      {/* Loyalty Summary */}
      <div className="two-column-grid">
        <div className="card loyalty-box">
          <h4>Loyalty Summary</h4>
          <div className="loyalty-row">
            <div>
              <strong>+1</strong>
              <div>Member</div>
            </div>
            <div>
              <strong>{summary.offersCompleted + summary.rewardsGiven + summary.spentItems}</strong>
              <div>Total Activities</div>
            </div>
          </div>
          <div className="loyalty-row">
            <div>
              <strong>{summary.pointsEarned}</strong>
              <div>Points Earned</div>
            </div>
            <div>
              <strong>{summary.spentItems}</strong>
              <div>Items Bought</div>
            </div>
          </div>
          <div className="loyalty-row">
            <div>
              <strong>{summary.rewardsGiven}</strong>
              <div>Rewards Redeemed</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h4>Total Points Summary</h4>
          <h2>{summary.pointsEarned} pts</h2>
          <span className="summary-subtext">Includes all earned and remaining</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
