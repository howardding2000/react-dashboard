import React from "react";

import "./DbHeader.less";
const DbHeader = ({ loggedInUser, onLogout }) => {
  const clickHander = () => {
    onLogout();
  };
  return (
    <div className='db__header'>
      <div className='db__welcome'>
        <span>Welcome {loggedInUser} !</span>
        <a
          onClick={clickHander}
          className='db__welcome__button'
          href='javascrip:;'
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default DbHeader;
