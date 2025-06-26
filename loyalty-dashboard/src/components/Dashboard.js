// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { format } from "date-fns";

const Dashboard = () => {
  const userId = "loyalty";
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      const txnRef = collection(db, "users", userId, "transactions");
      const q = query(txnRef, orderBy("date", "desc"));
      const txnSnap = await getDocs(q);
      const txnList = txnSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(txnList);
    };

    fetchData();
  }, [userId]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Loyalty Dashboard</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-sm">Members enrolled</h3>
          <p className="text-xl font-bold">1</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-sm">Offers completed</h3>
          <p className="text-xl font-bold">
            {
              transactions.filter((t) => t.type === "earned").length
            }
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-sm">Rewards given</h3>
          <p className="text-xl font-bold">
            {
              transactions.filter((t) => t.type === "redeemed").length
            }
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-sm">Points earned</h3>
          <p className="text-xl font-bold">{userData.totalPoints}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="divide-y">
          {transactions.map((txn) => (
            <li key={txn.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="text-sm">{txn.note || txn.type}</p>
                <p className="text-xs text-gray-500">
                  {format(txn.date.toDate(), "dd MMM yyyy")}
                </p>
              </div>
              <div
                className={`text-sm font-bold ${
                  txn.type === "redeemed" ? "text-red-600" : "text-green-600"
                }`}
              >
                {txn.type === "redeemed" ? "-" : "+"}
                {txn.amount} pts
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
