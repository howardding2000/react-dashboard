import React from "react";

import classes from "./DbHeader.module.less";
const DbHeader = ({ loggedInUser, onLogout }) => {
  const clickHander = () => {
    onLogout();
  };
  return (
    <div className={classes.db__header}>
      <div className={classes.db__welcome}>
        <span>Welcome {loggedInUser} !</span>
        <a onClick={clickHander} className={classes.button} href='javascrip:;'>
          Logout
        </a>
      </div>
    </div>
  );
};

export default DbHeader;
