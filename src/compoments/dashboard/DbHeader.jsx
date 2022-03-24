import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import "./DbHeader.less";
const DbHeader = () => {
  const { loggedInUser, onLogout } = useContext(AuthContext);
  const clickHander = () => {
    onLogout();
  };
  return (
    <div className='db__header'>
      <div className='db__welcome'>
        <span>Welcome {loggedInUser} !</span>
        <span onClick={clickHander} className='db__welcome__button'>
          Logout
        </span>
      </div>
    </div>
  );
};

export default DbHeader;
