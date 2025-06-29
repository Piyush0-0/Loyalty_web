import React from "react";

function Dashboard({ summary, recentActivity }) {
  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="card">{summary.membersEnrolled}<br />Members enrolled</div>
        <div className="card">{summary.offersCompleted}<br />Offers completed</div>
        <div className="card">{summary.rewardsGiven}<br />Rewards given</div>
        <div className="card">{summary.pointsEarned}<br />Points earned</div>
      </div>

      <div className="recent-activity">
        <div className="activity-column">
          <h3>Offers Completed</h3>
          {recentActivity.offers.map((item, index) => (
            <div key={index} className="activity-item">
              <div className="date">{item.date}</div>
              <div className="desc">
                {item.title}<br /><span className="by">by {item.by}</span>
              </div>
              <div className="points">+{item.points} Points</div>
            </div>
          ))}
        </div>

        <div className="activity-column">
          <h3>Rewards Redeemed</h3>
          {recentActivity.rewards.map((item, index) => (
            <div key={index} className="activity-item">
              <div className="date">{item.date}</div>
              <div className="desc">
                {item.title}<br /><span className="by">by {item.by}</span>
              </div>
              <div className="points negative">{item.points} Points</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
