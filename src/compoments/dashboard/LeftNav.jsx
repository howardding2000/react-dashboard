import { Menu } from "antd";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import menuList from "../../config/menu-config";
import "./LeftNav.less";

const LeftNav = ({ broken }) => {
  // const [current, setCurrent] = useState(1);
  const { pathname } = useLocation();
  const activedKeyRef = useRef({
    openKey: null,
    selectedKey: null,
    pathname: pathname,
  });

  if (activedKeyRef.current.openKey) {
  }
  const { SubMenu } = Menu;

  // const handleClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  const getMenuNodes = useCallback((menuList) => {
    console.log("into getMenuNodes");
    return menuList.map((item) => {
      if (item.children) {
        const cItem = item.children.find(
          (cItem) => cItem.key === activedKeyRef.current.pathname
        );
        if (cItem) {
          activedKeyRef.current.openKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else {
        if (item.key === activedKeyRef.current.pathname) {
          activedKeyRef.current.selectedKey = item.key;
        }
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  }, []);

  //
  const currentMenuList = useMemo(() => getMenuNodes(menuList), [getMenuNodes]);

  return (
    <div className='left__nav'>
      <header className='left__nav__header'>
        <Link to='/'>
          <h1>{broken ? "R-D" : "React-dashboard"}</h1>
        </Link>
      </header>
      <Menu
        // onClick={handleClick}
        // defaultOpenKeys: Array with the keys of default opened sub menus
        defaultOpenKeys={[activedKeyRef.current.openKey]}
        // defaultSelectedKeys: Array with the keys of default selected menu items
        defaultSelectedKeys={[activedKeyRef.current.selectedKey]}
        mode='inline'
        theme='light'
      >
        {currentMenuList}
      </Menu>
    </div>
  );
};

export default LeftNav;
