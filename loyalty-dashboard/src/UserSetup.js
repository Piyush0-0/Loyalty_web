import { useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function UserSetup() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const createUserDoc = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "Anonymous",
          email: user.email,
          totalPoints: 0,
          createdAt: new Date(),
        });
        console.log("New user doc created!");
      }
    };

    createUserDoc();
  }, [user]);

  return null;
}

export default UserSetup;
