import "./DbHeader.less";

import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import LinkButton from "../ui/LinkButton";
import TimeAndWeather from "./header/TimeAndWeather";


const DbHeader = ({title}) => {
  const { loggedInUser, onLogout } = useContext(AuthContext);
  const logoutHander = () => {
    onLogout();
  };
  return (
    <div className='db__header'>
      <div className='db__header__top'>
        <div className="db__header__top__welcome">
          <span>Welcome, {loggedInUser} !</span>
          <LinkButton onClick={logoutHander}>Logout</LinkButton>
        </div>
      </div>
      <div className='db__header__bottom'>
        <div className='db__header__bottom__title'>
          <h1>{title}</h1>
        </div>
        <div className='db__header__bottom__widget'>
          <TimeAndWeather />
        </div>
      </div>
    </div>
  );
};

export default DbHeader;
