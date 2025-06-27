import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Topbar = () => {
  const [user] = useAuthState(auth);

  return (
    <header>
      {user && (
        <div className="user-info">
          Hi, {user.displayName || user.email}
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Topbar;
