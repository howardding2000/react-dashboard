import { Menu } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import menuList from "../../config/menu-config";
import "./LeftNav.less";

const LeftNav = ({ broken, location }) => {
  // const [current, setCurrent] = useState(1);
  const { pathname } = useLocation();
  const { SubMenu } = Menu;

  const handleClick = (e) => {
    // console.log('click ', e);
    // setCurrent(e.key);
  };

  let openKey;
  let selectedKey;

  const getMenuNodes = (menuList) => {
    console.log("getMenuNodes");
    return menuList.map((item) => {
      if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === pathname);
        if (cItem) {
          openKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else {
        if (item.key === pathname) {
          selectedKey = item.key;
        }
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  };

  let currentMenuList = getMenuNodes(menuList);

  return (
    <div className='left__nav'>
      <header className='left__nav__header'>
        <Link to='/'>
          <h1>{broken ? "R-D" : "React-dashboard"}</h1>
        </Link>
      </header>
      {console.log("defaultOpenKeys", openKey, selectedKey)}
      <Menu
        onClick={handleClick}
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
        mode='inline'
        theme='light'
      >
        {currentMenuList}
      </Menu>
    </div>
  );
};

export default LeftNav;
