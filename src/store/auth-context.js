import React, { useState } from "react";
import store from "store";

export const AuthContext = React.createContext({
  loggedInUser: null,
  onLogout: () => {},
  onLogin: (username) => {},
});

const AuthContextProvider = (props) => {
  const storedLoggedInUser = store.get("user");

  const [loggedInUser, setLoggedInUser] = useState(storedLoggedInUser);

  const loginHandler = (username) => {
    setLoggedInUser(username);
    store.set("user", username);
  };

  const logoutHandler = () => {
    setLoggedInUser(null);
    store.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser: loggedInUser,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
