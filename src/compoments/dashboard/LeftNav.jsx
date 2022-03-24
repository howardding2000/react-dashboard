import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import menuList from "../../config/menu-config";
import "./LeftNav.less";

const LeftNav = ({ broken }) => {
  const [current, setCurrent] = useState(1);
  const { SubMenu } = Menu;

  const handleClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  const getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
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
        {getMenuNodes(menuList)}
      </Menu>
    </div>
  );
};

export default LeftNav;
