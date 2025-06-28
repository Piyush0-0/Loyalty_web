import axios from "axios";

const API_BASE = "http://localhost:5000/api/users";

// Get user by email (fixed: URL-encoding email)
export const getUser = async (email) => {
  const encodedEmail = encodeURIComponent(email);
  const res = await axios.get(`${API_BASE}/${encodedEmail}`);
  return res.data;
};

// Claim a reward
export const claimReward = async (email, reward) => {
  const res = await axios.post(`${API_BASE}/claim`, { email, reward });
  return res.data;
};
