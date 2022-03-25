import "./DbHeader.less";

import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import LinkButton from "../ui/LinkButton";
import TimeAndWeather from "./header/TimeAndWeather";


const DbHeader = (props) => {
  const { loggedInUser, onLogout } = useContext(AuthContext);
  const logoutHander = () => {
    onLogout();
  };
  return (
    <div className='db__header'>
      <div className='db__header__top'>
        <div>
          <span>Welcome, {loggedInUser} !</span>
          <LinkButton onClick={logoutHander}>Logout</LinkButton>
        </div>
      </div>
      <div className='db__header_bottom'>
        <div className='db__header_bottom__title'>
          <h1>Home</h1>
        </div>
        <div className='db__header_bottom__widget'>
          <TimeAndWeather />
        </div>
      </div>
    </div>
  );
};

export default DbHeader;
