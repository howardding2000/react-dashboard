import { Menu } from "antd";
import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import menuList from "config/menu-config";
import "./LeftNav.less";

const LeftNav = ({ broken, setTitle }) => {
  const { SubMenu } = Menu;
  const { pathname } = useLocation();

  //get top path from full path
  const re = /(\/\w*)/;
  const rootPathname = pathname.split(re).filter((item) => item)[0];

  const activedKeyRef = useRef({
    openKey: null,
    selectedKey: null,
    rootPathname: rootPathname,
  });

  const titleMapRef = useRef(new Map());

  const handleClick = (e) => {};

  useEffect(() => {
    // change title according to the path,
    setTitle(titleMapRef.current.get(rootPathname) || "Home");
  }, [setTitle, rootPathname]);

  const getMenuNodes = useCallback((menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        const cItem = item.children.find(
          (cItem) => cItem.key === activedKeyRef.current.rootPathname
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
        titleMapRef.current.set(item.key, item.title);

        if (item.key === activedKeyRef.current.rootPathname) {
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
          <h1>{broken ? "R-D" : "React-Dashboard"}</h1>
        </Link>
      </header>
      <Menu
        onClick={handleClick}
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