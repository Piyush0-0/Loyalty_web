import React, { useState, useEffect } from "react";
import "./App.css";
import { getUser, claimReward } from "./api";

function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [rewardsList, setRewardsList] = useState([
    { id: 1, title: "10% Off Coupon", cost: 100 },
    { id: 2, title: "Free Coffee", cost: 150 },
    { id: 3, title: "Movie Ticket", cost: 300 },
    { id: 4, title: "₹100 Gift Card", cost: 500 },
  ]);
  const [points, setPoints] = useState(0);
  const email = "piyush@gmail.com";

  const [recentActivity, setRecentActivity] = useState({
    offers: [],
    rewards: []
  });

  const menuSections = {
    Setup: ["Home", "Rewards", "Analytics", "History"],
    Manage: ["User Setup", "Settings"]
  };

  const summary = {
    membersEnrolled: 1,
    offersCompleted: recentActivity.offers.length,
    rewardsGiven: recentActivity.rewards.length,
    pointsEarned: points
  };

  const filteredSections = Object.entries(menuSections).reduce((acc, [section, items]) => {
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) acc[section] = filteredItems;
    return acc;
  }, {});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser(email);
        setPoints(user.points);
        const earned = user.transactions.filter(t => t.type === "Earned");
        const redeemed = user.transactions.filter(t => t.type === "Redeemed");
        setRecentActivity({
          offers: earned.map(t => ({
            date: t.date,
            title: t.description,
            by: "Customer",
            points: t.points
          })),
          rewards: redeemed.map(t => ({
            date: t.date,
            title: t.description,
            by: "Customer",
            points: -t.points
          }))
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleClaim = async (rewardId) => {
    const reward = rewardsList.find((r) => r.id === rewardId);
    if (!reward || points < reward.cost) return;

    try {
      const updatedUser = await claimReward(email, reward);
      setPoints(updatedUser.points);
      setRewardsList(prev => prev.filter(r => r.id !== rewardId));

      const date = new Date().toLocaleDateString("en-IN", {
        month: "long",
        day: "2-digit"
      });

      setRecentActivity(prev => ({
        ...prev,
        rewards: [
          ...prev.rewards,
          {
            date,
            title: reward.title,
            by: "Customer",
            points: -reward.cost
          }
        ]
      }));
    } catch (err) {
      console.error("Failed to claim reward", err);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {Object.entries(filteredSections).map(([section, items]) => (
          <div key={section}>
            <div className="menu-header">{section}</div>
            {items.map((item) => (
              <div
                key={item}
                className={`menu-item ${activeSection === item ? "active" : ""}`}
                onClick={() => setActiveSection(item)}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="main-area">
        <div className="topbar">
          <div className="username">Piyush</div>
        </div>

        <div className="content">
          {activeSection === "Home" && (
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
                      <div className="desc">{item.title}<br /><span className="by">by {item.by}</span></div>
                      <div className="points">+{item.points} Points</div>
                    </div>
                  ))}
                </div>

                <div className="activity-column">
                  <h3>Rewards Redeemed</h3>
                  {recentActivity.rewards.map((item, index) => (
                    <div key={index} className="activity-item">
                      <div className="date">{item.date}</div>
                      <div className="desc">{item.title}<br /><span className="by">by {item.by}</span></div>
                      <div className="points negative">{item.points} Points</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "Rewards" && (
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
          )}

          {activeSection === "Analytics" && (
            <div className="analytics-placeholder">
              <h2>Analytics</h2>
              <p>Charts for earned and redeemed points will appear here.</p>
            </div>
          )}

          {activeSection === "History" && (
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
          )}

          {activeSection === "User Setup" && (
            <div className="form-area">
              <h2>User Setup</h2>
              <label>Name:</label>
              <input type="text" placeholder="Enter name" />
              <label>Email:</label>
              <input type="email" placeholder="Enter email" />
              <button className="claim-btn">Save</button>
            </div>
          )}

          {activeSection === "Settings" && (
            <div className="form-area">
              <h2>Settings</h2>
              <label>Theme:</label>
              <select>
                <option>Light</option>
                <option>Dark</option>
              </select>
              <button className="claim-btn">Apply</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
