import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users`, data)
      .then((res) => {
        // console.log(response);
        setUser(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authInfo = {
    createUser,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
