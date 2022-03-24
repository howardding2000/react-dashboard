import { Layout } from "antd";
import React, { useState } from "react";

import LeftNav from "../../compoments/dashboard/LeftNav";
import DbHeader from "../../compoments/dashboard/DbHeader";
import DbContent from "../../compoments/dashboard/DbContent";
import DbFooter from "../../compoments/dashboard/DbFooter";

import "./dashboard.less";

const { Header, Footer, Sider, Content } = Layout;

const Dashboard = () => {
  const [broken, setBrokent] = useState(false);

  const brokenHandler = (broken) => {
    setBrokent(broken);
  };
  return (
    <Layout className='db__layout'>
      <Sider
        className='db__sider'
        theme='light'
        breakpoint='lg'
        onBreakpoint={brokenHandler}
        // width='12rem'
      >
        <LeftNav broken={broken} />
      </Sider>
      <Layout>
        <Header className='db__header'>
          <DbHeader />
        </Header>
        <Content className='db__content'>
          <DbContent />
        </Content>
        <Footer className='db__footer'>
          <DbFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
