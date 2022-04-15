import React, { useState, useEffect, useCallback } from "react";
import store from "store";

export const AuthContext = React.createContext({
  token: "",
  loggedInUser: "",
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (username) => {},
});

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remaningDuration = adjExpirationTime - currentTime;

  return remaningDuration;
};

const retrieveStoredToken = () => {
  const storedToken = store.get("token");
  const storedLoggedInUser = store.get("loggedInUser");
  const storedExpirationDate = store.get("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (!storedToken) {
    return null;
  }

  if (remainingTime <= 60000) {
    store.remove("token");
    store.remove("loggedInUser");
    store.remove("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    loggedInUser: storedLoggedInUser,
    duration: remainingTime,
  };
};

const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const [token, setToken] = useState(tokenData?.token);
  const [loggedInUser, setLoggedInUser] = useState(tokenData?.loggedInUser);
  const isLoggedIn = !!token;

  const loginHandler = ({ username: loggedInUser, _id: token, expirationTime }) => {
    setToken(token);
    setLoggedInUser(loggedInUser);
    store.set("token", token);
    store.set("loggedInUser", loggedInUser);
    store.set("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setLoggedInUser(null);
    store.remove("token");
    store.remove("loggedInUser");
    store.remove("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [logoutHandler, tokenData]);

  const contextValue = {
    token,
    isLoggedIn,
    loggedInUser,
    logout: logoutHandler,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
