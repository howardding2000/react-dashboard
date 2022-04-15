import React from "react";
import "./home.less";
import dashboard from "../../../assets/img/dashboard.svg";
const Home = () => {
  return (
    <div className='pages__home'>
      <img src={dashboard} alt='dashboard' />
      <div>Welcome to React-Dashboard</div>
    </div>
  );
};

export default Home;
