import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics({ recentActivity, points }) {
  const data = [
    {
      name: "Earned",
      points: recentActivity.offers.reduce((sum, item) => sum + item.points, 0),
    },
    {
      name: "Redeemed",
      points: recentActivity.rewards.reduce((sum, item) => sum + item.points, 0),
    },
    {
      name: "Spent",
      points: recentActivity.spent.reduce((sum, item) => sum + Math.abs(item.points), 0),
    },
  ];

  return (
    <div className="analytics">
      <h2>Points Analytics</h2>
      <p>Current Points: {points}</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="points" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
