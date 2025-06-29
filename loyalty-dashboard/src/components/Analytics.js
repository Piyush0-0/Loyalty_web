import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Analytics({ recentActivity }) {
  // Prepare data for the chart
  const data = [
    {
      name: "Earned",
      points: recentActivity.offers.reduce((sum, item) => sum + item.points, 0),
    },
    {
      name: "Redeemed",
      points: recentActivity.rewards.reduce((sum, item) => sum + Math.abs(item.points), 0),
    },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Analytics</h2>
      <ResponsiveContainer>
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
