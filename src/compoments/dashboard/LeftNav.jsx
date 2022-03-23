import { Menu } from 'antd';
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
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './LeftNav.module.less';

const LeftNav = ({ broken }) => {
  const [current, setCurrent] = useState(1);
  const { SubMenu } = Menu;

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className={classes.left__nav}>
      <header className={classes.left__nav__header}>
        <Link to='/'>
          <h1>{broken ? 'R-D' : 'React-dashboard'}</h1>
        </Link>
      </header>
      <Menu
        // theme={this.state.theme}
        onClick={handleClick}
        // style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode='inline'
      >
        <Menu.Item key='1' icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <SubMenu key='sub1' icon={<AppstoreOutlined />} title='Product'>
          <Menu.Item key='2' icon={<TagsOutlined />}>
            Categories
          </Menu.Item>
          <Menu.Item key='3' icon={<BarsOutlined />}>
            Products
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='4' icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key='5' icon={<SafetyCertificateOutlined />}>
          Roles
        </Menu.Item>
        <SubMenu key='sub2' icon={<BarChartOutlined />} title='Charts'>
          <Menu.Item key='6' icon={<AreaChartOutlined />}>
            Area Chart
          </Menu.Item>
          <Menu.Item key='7' icon={<PieChartOutlined />}>
            Pie Chart
          </Menu.Item>
          <Menu.Item key='8' icon={<BarChartOutlined />}>
            Bar Chart
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default LeftNav;
