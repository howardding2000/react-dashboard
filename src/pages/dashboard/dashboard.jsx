import { Layout } from "antd";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";

import LeftNav from "../../compoments/dashboard/LeftNav";
import DbHeader from "../../compoments/dashboard/DbHeader";
import DbContent from "../../compoments/dashboard/DbContent";
import DbFooter from "../../compoments/dashboard/DbFooter";

import classes from "./dashboard.module.less";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const { loggedInUser, onLogout } = useContext(AuthContext);

  const [broken, setBrokent] = useState(false);

  const brokenHandler = (broken) => {
    setBrokent(broken);
  };
  return (
    <>
      {/* {!loggedInUser && <Navigate to='/login' />} */}
      <Layout className={classes.db__layout}>
        <Sider
          className={classes.db__sider}
          breakpoint='lg'
          onBreakpoint={brokenHandler}
        >
          <LeftNav broken={broken} />
        </Sider>
        <Layout>
          <Header className={classes.db__header}>
            <DbHeader loggedInUser={loggedInUser} onLogout={onLogout} />
          </Header>
          <Content className={classes.db__content}>
            <DbContent />
          </Content>
          <Footer className={classes.db__footer}>
            <DbFooter />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
