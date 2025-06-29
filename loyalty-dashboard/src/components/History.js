import React from "react";

function History({ recentActivity }) {
  return (
    <div className="history-table">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.offers.map((item, i) => (
            <tr key={`offer-${i}`}>
              <td>{item.date}</td>
              <td>Earned</td>
              <td>{item.title}</td>
              <td style={{ color: "green" }}>+{item.points}</td>
            </tr>
          ))}
          {recentActivity.rewards.map((item, i) => (
            <tr key={`reward-${i}`}>
              <td>{item.date}</td>
              <td>Redeemed</td>
              <td>{item.title}</td>
              <td style={{ color: "red" }}>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
