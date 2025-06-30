export async function getUser(email) {
  const res = await fetch(`http://localhost:5000/api/users/${email}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function claimReward(email, reward) {
  const res = await fetch("http://localhost:5000/api/users/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, reward }),
  });
  if (!res.ok) {
    throw new Error("Failed to claim reward");
  }
  return res.json();
}

export async function spendPoints(email, item) {
  const res = await fetch("http://localhost:5000/api/users/spend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, item }),
  });
  if (!res.ok) {
    throw new Error("Failed to spend points");
  }
  return res.json();
}
