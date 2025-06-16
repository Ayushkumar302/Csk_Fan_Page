import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get user details from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser({ uid: user.uid, ...userDoc.data() }); // Store uid and user data
        } else {
          setUser(null); // Handle case where user data doesn't exist
        }
      } else {
        setUser(null); // User is signed out
      }
    });

    return () => unsubscribe();
  }, [db]);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
