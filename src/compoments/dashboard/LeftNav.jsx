import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  BarsOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  TagsOutlined,
  AreaChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftNav.less";

const LeftNav = ({ broken }) => {
  const [current, setCurrent] = useState(1);
  const { SubMenu } = Menu;

  const handleClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className='left__nav'>
      <header className='left__nav__header'>
        <Link to='/'>
          <h1>{broken ? "R-D" : "React-dashboard"}</h1>
        </Link>
      </header>
      <Menu
        onClick={handleClick}
        defaultOpenKeys={["home"]}
        selectedKeys={[current]}
        mode='inline'
        theme='light'
      >
        <Menu.Item key='home' icon={<HomeOutlined />}>
          <Link to='/home'>Home</Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<AppstoreOutlined />} title='Product'>
          <Menu.Item key='categories' icon={<TagsOutlined />}>
            <Link to='/categories'>Categories</Link>
          </Menu.Item>
          <Menu.Item key='products' icon={<BarsOutlined />}>
            <Link to='/products'>Products</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='users' icon={<UserOutlined />}>
          <Link to='/users'>Users</Link>
        </Menu.Item>
        <Menu.Item key='roles' icon={<SafetyCertificateOutlined />}>
          <Link to='/roles'>Roles</Link>
        </Menu.Item>
        <SubMenu key='sub2' icon={<BarChartOutlined />} title='Charts'>
          <Menu.Item key='areaChart' icon={<AreaChartOutlined />}>
            <Link to='/charts'>Area Chart</Link>
          </Menu.Item>
          <Menu.Item key='pieChart' icon={<PieChartOutlined />}>
            <Link to='/charts'>Pie Chart</Link>
          </Menu.Item>
          <Menu.Item key='barChart' icon={<BarChartOutlined />}>
            <Link to='/charts'>Bar Chart</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default LeftNav;
