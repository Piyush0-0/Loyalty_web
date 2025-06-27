import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Auth = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider).catch(console.error);
  };

  return (
    <div className="auth-container">
      <h1>Welcome to Loyalty Dashboard</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Auth;
