import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false)

  const createUser = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users`, data)
      .then((res) => {
        // console.log(response);
        setUser(res.data)
        localStorage.setItem("user", JSON.stringify(data))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loggedUser = (data) => {
    setLoading(true)
    console.log(data)
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, data)
      .then((res) => {
        // console.log(response);
        setUser(res.data)
        localStorage.setItem("user", JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const authInfo = {
    createUser,
    loggedUser,
    logoutUser,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
