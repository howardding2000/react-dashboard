import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./store/auth-context";
import "./index.less";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
