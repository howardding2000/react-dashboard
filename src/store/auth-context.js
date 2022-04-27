import React, { useEffect, useCallback, useReducer } from "react";
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

const defaultUserState = {
  token: "",
  loggedInUser: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      const user = action.user;
      const userInfo = { username:user.username, menus:user.role.menus };
      store.set("token", user._id);
      store.set("loggedInUser", JSON.stringify(userInfo));
      store.set("expirationTime", user.expirationTime);
      return {
        token: user._id,
        loggedInUser: userInfo,
      };
    }
    case "LOGOUT": {
      store.remove("token");
      store.remove("loggedInUser");
      store.remove("expirationTime");
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      return defaultUserState;
    }
    default:
      return defaultUserState;
  }
};

const AuthContextProvider = (props) => {
  const defaultUserState = retrieveStoredToken();

  const [userState, dispatchUserState] = useReducer(
    userReducer,
    defaultUserState
  );

  const userIsLoggedIn = !!userState?.token;
  
  const loginHandler = (user) => {
    dispatchUserState({ type: "LOGIN", user: user });
    const remainingTime = calculateRemainingTime(user.expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    dispatchUserState({ type: "LOGOUT" });
  }, []);

  useEffect(() => {
    if (defaultUserState?.duration) {
      logoutTimer = setTimeout(logoutHandler, defaultUserState?.duration);
    }
  }, [logoutHandler, defaultUserState]);

  const contextValue = {
    token: userState?.token,
    isLoggedIn: userIsLoggedIn,
    loggedInUser: userState?.loggedInUser,
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
