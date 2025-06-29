import React, { useState, useEffect } from "react";
import "./App.css";
import { getUser, claimReward } from "./api";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Rewards from "./components/Rewards";
import Analytics from "./components/Analytics";
import History from "./components/History";
import UserSetup from "./components/UserSetup";
import Settings from "./components/Settings";

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
  const email = "piyushsamanta9885@gmail.com";

  const [recentActivity, setRecentActivity] = useState({
    offers: [],
    rewards: [],
  });

  const menuSections = {
    Setup: ["Home", "Rewards", "Analytics", "History"],
    Manage: ["User Setup", "Settings"],
  };

  const summary = {
    membersEnrolled: 1,
    offersCompleted: recentActivity.offers.length,
    rewardsGiven: recentActivity.rewards.length,
    pointsEarned: points,
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
        const earned = user.transactions.filter((t) => t.type === "Earned");
        const redeemed = user.transactions.filter((t) => t.type === "Redeemed");
        setRecentActivity({
          offers: earned.map((t) => ({
            date: t.date,
            title: t.description,
            by: "Customer",
            points: t.points,
          })),
          rewards: redeemed.map((t) => ({
            date: t.date,
            title: t.description,
            by: "Customer",
            points: -t.points,
          })),
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
      setRewardsList((prev) => prev.filter((r) => r.id !== rewardId));

      const date = new Date().toLocaleDateString("en-IN", {
        month: "long",
        day: "2-digit",
      });

      setRecentActivity((prev) => ({
        ...prev,
        rewards: [
          ...prev.rewards,
          {
            date,
            title: reward.title,
            by: "Customer",
            points: -reward.cost,
          },
        ],
      }));
    } catch (err) {
      console.error("Failed to claim reward", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        filteredSections={filteredSections}
      />

      <div className="main-area">
        <Topbar username="Piyush" />

        <div className="content">
          {activeSection === "Home" && (
            <Dashboard summary={summary} recentActivity={recentActivity} />
          )}
          {activeSection === "Rewards" && (
            <Rewards rewardsList={rewardsList} points={points} handleClaim={handleClaim} />
          )}
          {activeSection === "Analytics" && <Analytics recentActivity={recentActivity} />}
          {activeSection === "History" && <History recentActivity={recentActivity} />}
          {activeSection === "User Setup" && <UserSetup />}
          {activeSection === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default App;
