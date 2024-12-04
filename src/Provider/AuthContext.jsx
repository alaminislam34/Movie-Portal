import { createContext, useState } from "react";

export const ProviderContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const info = { user, setUser };
  return (
    <ProviderContext.Provider value={info}>{children}</ProviderContext.Provider>
  );
};

export default AuthContext;
