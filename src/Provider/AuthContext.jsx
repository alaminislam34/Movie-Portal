import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const ProviderContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  // sign in user
  const createUser = (email, password, name, photoUrl) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const updateUser = { displayName: name, photoURL: photoUrl };
        updateProfile(auth.currentUser, updateUser)
          .then((result) => {
            setUser(result.currentUser);
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, [setUser]);

  // user Log out
  const handleUserDelete = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {});
  };
  const info = {
    user,
    setUser,
    error,
    createUser,
    handleUserDelete,
    setMovies,
    movies,
  };
  return (
    <ProviderContext.Provider value={info}>{children}</ProviderContext.Provider>
  );
};

export default AuthContext;
