import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const ProviderContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [setUser]);

  // user Log out
  const handleLogoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {});
  };
  const info = {
    user,
    setUser,
    error,
    handleLogoutUser,
    setMovies,
    movies,
    loading,
    setError,
  };
  return (
    <ProviderContext.Provider value={info}>{children}</ProviderContext.Provider>
  );
};

export default AuthContext;
