import React, { useState, useEffect } from "react";
import "./App.css";
import { getUser, claimReward, spendPoints } from "./api";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Rewards from "./components/Rewards";
import SpendPoints from "./components/SpendPoints";
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
  { id: 5, title: "Mobile Data Pack", cost: 250 },
  { id: 6, title: "Pizza Voucher", cost: 400 },
  { id: 7, title: "Music Subscription", cost: 350 },
  { id: 8, title: "Online Course Coupon", cost: 600 },
  { id: 9, title: "Gym Day Pass", cost: 200 },
  { id: 10, title: "Amazon Gift Card", cost: 700 },
]);


  const [spendList, setSpendList] = useState([
    { id: 1, title: "Notebook", cost: 200 },
    { id: 2, title: "Pen", cost: 50 },
    { id: 3, title: "Headphones", cost: 400 },
    { id: 4, title: "T-shirt", cost: 350 },
  ]);

  const [points, setPoints] = useState(0);
  const email = "piyushsamanta9885@gmail.com";

  const [recentActivity, setRecentActivity] = useState({
    offers: [],
    rewards: [],
    spent: [],
  });

  const menuSections = {
    Setup: ["Home", "Rewards", "Spend Points", "Analytics", "History"],
    Manage: ["User Setup", "Settings"],
  };

  const summary = {
    membersEnrolled: 1,
    offersCompleted: recentActivity.offers.length,
    rewardsGiven: recentActivity.rewards.length,
    spentItems: recentActivity.spent.length,
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
        const spent = user.transactions.filter((t) => t.type === "Spent");

        setRecentActivity({
          offers: earned.map((t) => ({
            date: new Date(t.date).toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
            title: t.description,
            by: "Customer",
            points: t.points,
          })),
          rewards: redeemed.map((t) => ({
            date: new Date(t.date).toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
            title: t.description,
            by: "Customer",
            points: -t.points,
          })),
          spent: spent.map((t) => ({
            date: new Date(t.date).toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
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

      setRecentActivity((prev) => ({
        ...prev,
        offers: [
          ...prev.offers,
          {
            date: new Date().toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
            title: reward.title,
            by: "Customer",
            points: reward.cost,
          },
        ],
      }));
    } catch (err) {
      console.error("Failed to claim reward", err);
    }
  };

  const handleSpend = async (itemId) => {
    const item = spendList.find((i) => i.id === itemId);
    if (!item || points < item.cost) return;

    try {
      const updatedUser = await spendPoints(email, item);
      setPoints(updatedUser.points);
      setSpendList((prev) => prev.filter((i) => i.id !== itemId));

      setRecentActivity((prev) => ({
        ...prev,
        spent: [
          ...prev.spent,
          {
            date: new Date().toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
            title: item.title,
            by: "Customer",
            points: -item.cost,
          },
        ],
      }));
    } catch (err) {
      console.error("Failed to spend points", err);
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
            <Home summary={summary} recentActivity={recentActivity} />
          )}
          {activeSection === "Rewards" && (
            <Rewards rewardsList={rewardsList} points={points} handleClaim={handleClaim} />
          )}
          {activeSection === "Spend Points" && (
            <SpendPoints spendList={spendList} points={points} handleSpend={handleSpend} />
          )}
          {activeSection === "Analytics" && (
            <Analytics recentActivity={recentActivity} points={points} />
          )}
          {activeSection === "History" && <History recentActivity={recentActivity} />}
          {activeSection === "User Setup" && <UserSetup />}
          {activeSection === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default App;
