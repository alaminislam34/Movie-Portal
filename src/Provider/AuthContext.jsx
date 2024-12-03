import { createContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

export const ProviderContext = createContext();

const AuthContext = ({ children }) => {
  // const [users, setUsers] = useState(null);
  // const [errors, setErrors] = useState(null);
  // const provider = new GoogleAuthProvider();
  // const signInGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log(result.user);
  //       setUsers(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setErrors(error);
  //     });
  // };
  const number = 33;

  const info = { number };
  return (
    <ProviderContext.Provider value={info}>{children}</ProviderContext.Provider>
  );
};

export default AuthContext;
