import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import Tilt from "react-parallax-tilt";

function Home({ summary, recentActivity }) {
  const redeemedPoints = recentActivity.rewards.reduce((sum, t) => sum + Math.abs(t.points), 0);
  const spentPoints = recentActivity.spent.reduce((sum, t) => sum + Math.abs(t.points), 0);
  const totalSpent = redeemedPoints + spentPoints;
  const currentPoints = summary.pointsEarned;
  const earnedPoints = currentPoints + totalSpent;

  const pieChartData = [
    { name: "Earned", value: earnedPoints },
    { name: "Spent", value: totalSpent },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  const stackedBarData = [
    {
      name: "Points",
      Earned: earnedPoints,
      Redeemed: redeemedPoints,
      Spent: spentPoints,
    },
  ];

  const topSpending = [...recentActivity.spent]
    .sort((a, b) => Math.abs(b.points) - Math.abs(a.points))
    .slice(0, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {}
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
        <div
          style={{
            background: "#fff",
            color: "#4CAF50",
            textAlign: "center",
            fontSize: "32px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 0 25px rgba(0,0,0,0.1)",
            fontWeight: "bold",
          }}
        >
          🏆 Current Points: {summary.pointsEarned}
        </div>
      </Tilt>

      {}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {[
          { icon: "👥", value: summary.membersEnrolled, label: "Members" },
          { icon: "🎯", value: summary.offersCompleted, label: "Offers" },
          { icon: "🎁", value: summary.rewardsGiven, label: "Rewards" },
          { icon: "📊", value: recentActivity.spent.length, label: "Purchases" },
        ].map((card, i) => (
          <Tilt
            key={i}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.05}
            transitionSpeed={1500}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            style={{
              backgroundColor: "#e7d1e8",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "24px" }}>{card.icon}</div>
            <div style={{ fontSize: "20px" }}>{card.value}</div>
            <div style={{ fontSize: "14px" }}>{card.label}</div>
          </Tilt>
        ))}
      </div>

      {}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "space-between",
        }}
      >
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} style={{ flex: 1, minWidth: 300 }}>
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Points Breakdown (Pie)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Tilt>

        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} style={{ flex: 1, minWidth: 300 }}>
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Points Distribution (Stacked Bar)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stackedBarData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Earned" stackId="a" fill="#4CAF50" />
                <Bar dataKey="Redeemed" stackId="a" fill="#FF9800" />
                <Bar dataKey="Spent" stackId="a" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Tilt>
      </div>

      {}
      {topSpending.length > 0 && (
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3>💸 Top Spent Items</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {topSpending.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div style={{ fontSize: "13px", color: "#999" }}>{item.date}</div>
                  <div style={{ fontWeight: "bold" }}>{item.title}</div>
                  <div style={{ fontSize: "14px", color: "red" }}>
                    -{Math.abs(item.points)} Points
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Tilt>
      )}

      {}
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3>🕒 Recently Earned Rewards</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recentActivity.offers.slice(-5).reverse().map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#999" }}>{item.date}</div>
                <div style={{ fontWeight: "bold" }}>{item.title}</div>
                <div style={{ fontSize: "14px", color: "green" }}>+{item.points} Points</div>
              </li>
            ))}
          </ul>
        </div>
      </Tilt>
    </div>
  );
}

export default Home;
