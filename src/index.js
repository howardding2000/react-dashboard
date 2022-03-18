import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "antd/dist/antd.less";
import './my.less'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
