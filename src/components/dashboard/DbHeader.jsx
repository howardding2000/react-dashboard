import React, { useContext } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../store/auth-context";
import LinkButton from "../ui/LinkButton";
import TimeAndWeather from "./TimeAndWeather";

import "./DbHeader.less";
const DbHeader = ({ title }) => {
  const { loggedInUser, onLogout } = useContext(AuthContext);
  const { confirm } = Modal;

  const logoutHander = () => {
    confirm({
      title: "Do you want to log out?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      centered: true,
      onOk() {
        onLogout();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  return (
    <div className='db__header'>
      <div className='db__header__top'>
        <div className='db__header__top__welcome'>
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
