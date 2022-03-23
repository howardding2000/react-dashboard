import React, { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import { Navigate } from 'react-router-dom';
import classes from './DbHeader.module.less';
const DbHeader = () => {
  const { loggedInUser, onLogout } = useContext(AuthContext);

  const clickHander = () => {
    onLogout();
  };
  return (
    <div className={classes.db__header}>
      {!loggedInUser && <Navigate to='/login' />}

      <div className={classes.db__welcome}>
        <span>Welcome {loggedInUser} !</span>
        <a onClick={clickHander} className={classes.button} href='javascrip:;'>
          Logout
        </a>
      </div>
    </div>
  );
};

export default DbHeader;
