import React from 'react';
import { Button, message } from 'antd';

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
