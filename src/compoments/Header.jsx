import React from 'react';
import classes from './Header.module.less';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>React-Dashborad</h1>
      </div>
    </header>
  );
};

export default Header;
