import React from "react";
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

function Analytics({ recentActivity, points }) {
  const earned = recentActivity.offers.reduce((sum, item) => sum + item.points, 0);
  const redeemed = recentActivity.rewards.reduce((sum, item) => sum + item.points, 0);
  const spent = recentActivity.spent.reduce((sum, item) => sum + Math.abs(item.points), 0);

  const chartData = [
    { name: "Earned", value: earned },
    { name: "Redeemed", value: redeemed },
    { name: "Spent", value: spent },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  const timelineData = [...recentActivity.offers, ...recentActivity.rewards, ...recentActivity.spent]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item, i) => ({
      name: item.title || `Txn ${i + 1}`,
      points: Math.abs(item.points),
      type: item.points > 0 ? "Earned" : "Spent"
    }));

  return (
    <div className="dashboard" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h2>📊 Points Analytics Dashboard</h2>
      <p style={{ fontWeight: "bold", fontSize: "18px", color: "#4CAF50" }}>💰 Current Points: {points}</p>

      {/* Row 1: Bar + Pie */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }} className="analytics-placeholder">
          <h3>Category-wise Points</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }} className="analytics-placeholder">
          <h3>Pie Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                isAnimationActive
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Area + Line */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }} className="analytics-placeholder">
          <h3>Transaction Timeline (Line)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="points" stroke="#ff6f61" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }} className="analytics-placeholder">
          <h3>Activity Curve (Area)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="points" stroke="#8884d8" fillOpacity={1} fill="url(#colorPoints)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
