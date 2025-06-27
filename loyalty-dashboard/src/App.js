import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Rewards from "./components/Rewards";
import Store from "./components/Store";
import Analytics from "./components/Analytics";
import History from "./components/History";
import Auth from "./components/Auth";
import "./styles.css";

function App() {
  const [user, loading] = useAuthState(auth);
  const [section, setSection] = useState("home");

  if (loading) return <p>Loading...</p>;
  if (!user) return <Auth />;

  const renderSection = () => {
    switch (section) {
      case "home": return <Dashboard />;
      case "rewards": return <Rewards />;
      case "store": return <Store />;
      case "analytics": return <Analytics />;
      case "history": return <History />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar"><Sidebar setSection={setSection} /></div>
      <div className="main">
        <div className="topbar"><Topbar /></div>
        <div className="content">{renderSection()}</div>
      </div>
    </div>
  );
}

export default App;
