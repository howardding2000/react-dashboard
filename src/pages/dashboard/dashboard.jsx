import { Button } from "antd";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const Dashboard = () => {
  const {loggedInUser,onLogout} = useContext(AuthContext);

  const clickHander = () => {
    onLogout();
  };

  return (
    <>
      {loggedInUser && (
        <div>
          <span>Welcome ${loggedInUser}</span>
          <Button onClick={clickHander}>Logout</Button>
        </div>
      )}
      {!loggedInUser && <Navigate to="/login" />}
    </>
  );
};

export default Dashboard;
