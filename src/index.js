import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * antd:
 *  - customize theme in config-overfides.js -> modifyVars
 *  */ 
import "antd/dist/antd.less";

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
