import { Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftNav from "../../components/dashboard/LeftNav";
import DbHeader from "../../components/dashboard/DbHeader";
import DbFooter from "../../components/dashboard/DbFooter";

import "./dashboard.less";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const [broken, setBrokent] = useState(false);
  const [title, setTitle] = useState("Home");

  const brokenHandler = (broken) => {
    setBrokent(broken);
  };
  return (
    <Layout className='db__layout' style={{minHeight:'100%'}}>
      <Sider
        className='db__sider'
        theme='light'
        breakpoint='lg'
        onBreakpoint={brokenHandler}
        // width='12rem'
      >
        <LeftNav broken={broken} setTitle={setTitle} />
      </Sider>
      <Layout>
        <Header className='db__header'>
          <DbHeader title={title} />
        </Header>
        <Content className='db__content'>
          {/*
            * An <Outlet> should be used in parent route elements to render their child
            * route elements. This allows nested UI to show up when child routes are
            * rendered. If the parent route matched exactly, it will render a child
            * index route or nothing if there is no index route.
            *
          */ }
          <Outlet />
        </Content>
        <Footer className='db__footer'>
          <DbFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
