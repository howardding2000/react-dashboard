import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import menuList from "config/menu-config";
import "./LeftNav.less";
import { AuthContext } from "store/auth-context";

const LeftNav = ({ broken, setTitle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loggedInUser } = useContext(AuthContext);

  const { menus: authMenus } = loggedInUser;
  const activedKeyRef = useRef({
    openKey: null,
    selectedKey: null,
  });

  const titleMapRef = useRef(new Map());

  const handleClick = ({ key }) => {
    navigate(key);
  };

  useEffect(() => {
    // change title according to the path,
    let title = titleMapRef.current.get(pathname);
    if (title) {
      setTitle(title || "Home");
    } else {
      titleMapRef.current.forEach((value, key) => {
        if (pathname.indexOf(key) !== -1) {
          title = value;
        }
      });
      setTitle(title || "Home");
    }
  }, [setTitle, pathname]);

  // Obtain `openKey` and `selectedKey` by matching pathname and menu item's key, and store in `activedKeyRef`
  const getMenuNodes = useCallback(
    (menuList) => {
      return menuList.map((item) => {
        const isAuth = authMenus.some((menu) => menu === item.key);
        if (isAuth) {
          if (item.children) {
            const cItem = item.children.find(
              (cItem) => pathname.indexOf(cItem.key) !== -1
            );
            if (cItem) {
              activedKeyRef.current.openKey = item.key;
            }
            return {
              key: item.key,
              icon: item.icon,
              label: item.title,
              children: getMenuNodes(item.children),
            };
          } else {
            titleMapRef.current.set(item.key, item.title);

            if (pathname.indexOf(item.key) !== -1) {
              activedKeyRef.current.selectedKey = item.key;
            }
            return {
              key: item.key,
              icon: item.icon,
              label: item.title,
            };
          }
        } else {
          return null;
        }
      });
    },
    [pathname, authMenus]
  );

  const currentMenuItems = useMemo(
    () => getMenuNodes(menuList),
    [getMenuNodes]
  );

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
        items={currentMenuItems}
      />
    </div>
  );
};

export default LeftNav;
