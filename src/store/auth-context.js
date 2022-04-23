import React, { useState, useEffect, useCallback } from "react";
import store from "store";

export const AuthContext = React.createContext({
  token: "",
  loggedInUser: null,
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
  const storedLoggedInUser =
    !!store.get("loggedInUser") && JSON.parse(store.get("loggedInUser"));
  const storedExpirationDate = store.get("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  console.log(storedLoggedInUser);
  console.log(storedToken);

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

  const loginHandler = (user) => {
    console.log(user);
    console.log(user._id);
    const { username, role } = user;
    const menus = role.menus;
    const userInfo = { username, menus };
    store.set("token", user._id);
    store.set("loggedInUser", JSON.stringify(userInfo));
    store.set("expirationTime", user.expirationTime);
    const remainingTime = calculateRemainingTime(user.expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    setToken(user._id);
    setLoggedInUser(userInfo);
  };

  const logoutHandler = useCallback(() => {
    store.remove("token");
    store.remove("loggedInUser");
    store.remove("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setToken(null);
    setLoggedInUser(null);
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
