import React from 'react';
import { Button, message } from 'antd';
import './App.css';
import { Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

const App = () => {
  const clickHandler = (e) => {
    message.success('Login successfully!');
  };
  return (
    <Button type='primary' onClick={clickHandler}>
      Primary
    </Button>
  );
};

export default App;
