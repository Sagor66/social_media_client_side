import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false)
  const [postData, setPostData] = useState([]);
  const [restState, setResetState] = useState(false);

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

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"))
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/posts?user_id=${user?.id}`)
      .then((res) => {
        setPostData(res.data);
        setResetState(false)
        // setPosted(false);
        // setDeleted(false);
      })
      .catch((error) => console.log(error.message));
  }, [restState]);

  const authInfo = {
    createUser,
    loggedUser,
    logoutUser,
    user,
    setUser,
    postData, 
    setPostData,
    restState, 
    setResetState,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
